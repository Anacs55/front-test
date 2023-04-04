import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Subscription } from 'rxjs';
import { ColumnDTO, ProjectDTO } from 'src/models/tasks/dashboard';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { TagService } from 'src/services/Label/label.service';
import { ProjectService } from 'src/services/Project/project.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { WebSocketService } from 'src/services/WebSocket/web-socket.service';
import { Id } from 'src/VOs/Id';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'project-view',
  templateUrl: 'project-view.component.html',
  styleUrls: ['project-view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectView implements OnInit, OnDestroy {
  constructor(
    private projectService: ProjectService,
    private labelService: TagService,
    private route: ActivatedRoute,
    private platform: Platform,
    private router: Router,
    private webSocketService: WebSocketService<any>,
    private analytics: AnalyticsService,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) { }

  @ViewChild('columnsContainer') columnsDivRefs?: ElementRef;
  @ViewChildren('column') columnsRef?: QueryList<ColumnComponent>;
  @ViewChild(DragScrollComponent) dragScrollRef?: DragScrollComponent;

  disabledScroll: boolean = false;
  private projectId!: string;
  columnIds: string[] = [];
  project?: ProjectDTO;
  subscription?: Subscription;

  dragSpeed: number = 30; // Number of pixels to move per scroll
  dragDelay: number = 0;

  maxColumnHeight: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get('id');
      if (!projectId) {
        this.router.navigate(['/']);
        return;
      }
      this.projectId = projectId;
      this.labelService.updateLabels(this.projectId);
      this.updateColumns();
      this.handleWS();
    });
    this.subscription = SessionManagerService.selectedTeamObserver.subscribe(() => this.router.navigate(['project']));
    this.dragDelay = this.getDragDelay();
  }

  ngAfterViewInit() {
    this.setComponentHeight(SessionManagerService.topMenuHeight);
    SessionManagerService.topMenuHeightObserver.subscribe(height => this.setComponentHeight(height));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.webSocketService.leaveProjectUpdates(this.projectId);
  }

  async handleWS() {
    await this.webSocketService.waitUntilOpen();
    this.webSocketService.joinProjectUpdates(this.projectId);
    this.webSocketService.subscribe((event) => {
      switch (event.type) {
        case 'updateItemIndex': {
          const columnId = event.columnId;
          const column = this.project?.columns?.filter(column => column.id === columnId)[0];
          if (!column) return;
          event.itemIds.forEach((itemId: string, index: number) => {
            const item = column?.items?.filter(item => item.id === itemId)[0];
            if (!item) return;
            item.index = index;
          });
          // Update only the column that has changed
          const columnRef = this.getColumnRef(columnId);
          columnRef?.reOrderItems();
          columnRef?.detectChanges();
        }
          break;
        case 'updateItemColumn': {
          const itemId: string = event.itemId;
          if (!itemId) return;
          const columnRef = this.getColumnRef(event.columnId);
          if (!columnRef) return;
          const movedItem = columnRef.column.items?.filter(item => item.id === itemId)[0];
          if (movedItem) return;
          const oldColumnRef = this.getColumnRef(event.oldColumnId);
          if (!oldColumnRef) return;
          const item = oldColumnRef.column.items?.filter(item => item.id === itemId)[0];
          if (!item) return;
          oldColumnRef.deleteItem(item);
          columnRef.addItem(item);
          oldColumnRef.detectChanges();
          columnRef.detectChanges();
        }
          break;
        case 'updateItemBasicData': {
          const itemId: string = event.itemId;
          if (!itemId) return;
          const columnRef = this.getColumnRef(event.columnId);
          if (!columnRef) return;
          const item = columnRef.column.items?.filter(item => item.id === itemId)[0];
          if (!item) return;
          item.name = event.name;
          if (item.tags !== event.tags) item.tags = event.tags;
          item.priority = event.priority;
          item.date = event.date;
          item.time = event.time;
          columnRef.getItemRef(itemId)?.detectChanges();
          columnRef.detectChanges();
          break;
        }
        case 'addColumn':
          if (!this.getColumn(event.column.id)) {
            this.addColumn(event.column);
            this.changeDetector.detectChanges();
          }
          break;
        case 'delColumn':
          this.deleteColumn(event.columnId);
          this.changeDetector.detectChanges();
          break;
      }
    });
  }

  private setComponentHeight(menuHeight: number) {
    const height = window.innerHeight - menuHeight - 5;
    this.maxColumnHeight = height - 40;
    this.columnsDivRefs?.nativeElement.style.setProperty('height', `${height - 40}px`);
    this.elementRef.nativeElement.style.setProperty('height', `${height}px`);
  }

  private getColumn(columnId: string): ColumnDTO | undefined {
    return this.project?.columns?.filter(column => column.id === columnId)[0];
  }

  private getColumnRef(columnId: string): ColumnComponent | undefined {
    return this.columnsRef?.filter(column => column.column.id === columnId)[0];
  }

  updateColumnsChanges(columnIds: string[]) {
    const columns = this.columnsRef?.filter(column => columnIds.includes(column.column.id));
    columns?.forEach(column => column.detectChanges());
  }

  private updateColumns() {
    if (!this.projectId) return;
    this.projectService.getPopulated(this.projectId).subscribe(res => {
      this.project = res;
      this.project.columns.forEach(column => this.addId(column));
      this.changeDetector.detectChanges();
    });
  }

  addId(column: ColumnDTO) {
    this.columnIds.push(column.id!);
  }

  addColumn(column: ColumnDTO) {
    this.project?.columns.push(column);
    this.addId(column);
  }

  columnCreate(name: string) {
    if (!this.project) return;
    const column: ColumnDTO = {
      id: Id.generate().value,
      name,
      items: []
    };
    this.addColumn(column);

    this.projectService.save(this.project).subscribe({
      next: () => {
        this.analytics.columnCreate(column, this.project!.id);
      },
      // TODO show error to the user
      error: () => this.project!.columns.pop(),
    });
  }

  private deleteColumn(columnId: string) {
    this.project!.columns = this.project!.columns.filter(column => column.id !== columnId);
  }

  saveProject() {
    return this.projectService.save(this.project!);
  }

  columnDelete(column: ColumnDTO) {
    const project = structuredClone(this.project!);
    this.deleteColumn(column.id);
    this.saveProject().subscribe({
      next: () => {
        this.analytics.columnDelete(column, this.project!.id);
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.project = project;
      }
    });
  }

  columnChange(column: ColumnDTO) {
    this.saveProject().subscribe({
      next: () => this.analytics.columnUpdate(column, this.project!.id),
    });
  }

  dropColumn(event: CdkDragDrop<ColumnDTO[]>) {
    moveItemInArray(this.project!.columns, event.previousIndex, event.currentIndex);
    // TODO handle error if not saved the reorder of columns
    this.projectService.save(this.project!).subscribe({ error: err => { } });
  }

  disableScroll() {
    this.disabledScroll = true;
  }

  swapScroll() {
    this.disabledScroll = false;
  }

  // TODO move to a common file?
  private getDragDelay(): number {
    if (this.platform.ANDROID || this.platform.IOS) return 800;
    return 0;
  }
}