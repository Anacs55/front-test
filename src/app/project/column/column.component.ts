import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnDTO } from 'src/models/tasks/dashboard';
import { ItemDTO, Priorities } from 'src/models/tasks/item';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { ItemService } from 'src/services/Item/item.service';
import { Id } from 'src/VOs/Id';
import { ContextMenuComponent } from '../../bee-components/contextmenu/contextmenu.component';
import { ColumnTimeComponent } from '../column-time/column-time.component';
import { DialogSelectColorComponent } from '../dialog-select-color/dialog-select-color.component';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'column[projectId][column]',
  templateUrl: 'column.component.html',
  styleUrls: ['column.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    public dialog: MatDialog,
    private platform: Platform,
    private changeDetector: ChangeDetectorRef,
    private analyticsService: AnalyticsService,
    private elementRef: ElementRef,
  ) { }

  @Input() projectId!: string;
  @Input() columnIds: string[] = [];
  private _column!: ColumnDTO;
  @Input()
  set column(column: ColumnDTO) {
    this._column = column;
    this.reOrderItems();
  }
  get column(): ColumnDTO {
    return this._column;
  }
  @Input() maxHeight: number = 0;

  @Output() deleteColumn = new EventEmitter<ColumnDTO>();
  @Output() columnChange = new EventEmitter<ColumnDTO>();
  @Output() updateColumns = new EventEmitter<string[]>();

  @ViewChild('contextMenu') contextMenu?: ContextMenuComponent;
  @ViewChild('columnTime') columnTime?: ColumnTimeComponent;

  @ViewChildren(ItemComponent) itermsRef?: QueryList<ItemComponent>;

  activeForm: boolean = false;
  columnName: string = '';
  menuPosition: { x: number, y: number } = { x: 0, y: 0 };

  dragSpeed: number = 15; // Number of pixels to move per scroll
  dragDelay: number = 0;

  ngOnInit() {
    if (!this.column) return;
    this.columnName = this.column.name;
    if (!this.column.items) this.column.items = [];
    if (!this.column.config) this.column.config = {
      showTimes: false,
    };
    this.dragDelay = this.getDragDelay();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.setProperty('max-height', `${this.maxHeight}px`);
  }

  public reOrderItems() {
    this.column.items?.sort((a, b) => a.index - b.index);
  }

  // TODO move to a common file?
  private getDragDelay(): number {
    if (this.platform.ANDROID || this.platform.IOS) return 800;
    return 0;
  }

  itemCreate(column: ColumnDTO, name: string) {
    const item: ItemDTO = {
      id: Id.generate().value,
      projectId: this.projectId,
      name,
      column: column.id,
      index: column.items?.length || 0,
      userIds: [],
      tags: [],
      time: {
        total: 0,
        spent: 0,
      },
      subtasks: [],
      observers: [],
    };
    this.itemService.create(item).subscribe(() => {
      if (!column.items) column.items = [];
      column.items.push(item);
      this.analyticsService.itemCreate(item);
      this.saveIndex(item);
      this.changeDetector.detectChanges();
    });
  }

  addItem(item: ItemDTO) {
    this.column?.items?.push(item);
    this.itemOrderByPriority();
    // Give time to the browser to render the new item and order all of the list
    setTimeout(() => this.changeDetector.markForCheck(), 100);
  }

  deleteItem(item: ItemDTO, updateItemsIndex: boolean = true) {
    this.column!.items = this.column.items!.filter(itemFiltered => itemFiltered.id !== item.id);
    if (updateItemsIndex && this.column.items.length > 1) this.saveIndex(item);
    this.changeDetector.detectChanges();
  }

  updateItem() {
    this.itemOrderByPriority();
    this.calcTime();
  }

  itemOrderByPriority() {
    this.column?.items?.sort((a, b) => {
      const priorityA = a.priority ? Priorities.filter(priority => a.priority === priority.value)[0].priority : -1;
      const priorityB = b.priority ? Priorities.filter(priority => b.priority === priority.value)[0].priority : -1;
      if (priorityA == priorityB) return 0;
      return priorityA > priorityB ? -1 : 1;
    });
  }

  itemTrackBy(_: number, item: ItemDTO): string {
    return item.id;
  }

  calcTime() {
    this.columnTime?.update();
  }

  drop(event: CdkDragDrop<ItemDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const item = event.container.data[event.currentIndex];
      this.saveIndex(item);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const item: ItemDTO = event.container.data[event.currentIndex];
      item.column = event.container.id;
      this.updateColumns.emit([event.previousContainer.id, event.container.id]);
      this.itemService.update(item).subscribe(() => {
        if (event.container.data.length !== 1) this.saveIndex(item);
      });
    }
  }

  saveIndex(item: ItemDTO) {
    const ids = this.column.items!.map(item => item.id);
    this.itemService.updateItemsIndex(this.projectId, this.column.id, ids).subscribe({
      next: () => this.analyticsService.itemMove(item, this.column, this.projectId),
    });
  }

  private save() {
    this.columnChange.emit(this.column);
  }

  //OPTIONS MENU
  columnNameChange(input: HTMLElement) {
    if (this.column?.name !== this.columnName) {
      this.columnName = this.column!.name;
      this.save();
    }
    input.blur();
  }

  openForm(input: any, active: boolean) {
    this.activeForm = active;
    if (this.activeForm)
      setTimeout(() => input.focus(), input.select(), (input.disabled = false));
  }

  showTimes() {
    if (!this.column) return;
    if (!this.column.config) this.column.config = {};
    this.column.config.showTimes = !this.column.config.showTimes;
    if (this.column.config.showTimes) this.calcTime();
    this.save();
  }

  columnDelete(column: ColumnDTO) {
    this.deleteColumn.emit(column);
  }

  openContextMenu(event: any, position: boolean = false) {
    event.preventDefault();
    this.menuPosition.x = event.layerX;
    this.menuPosition.y = event.layerY;
    this.contextMenu?.openMenu(position ? this.menuPosition : undefined);
  }

  columnChangeColor() {
    this.dialog.open(DialogSelectColorComponent, { width: '350px' }).afterClosed().subscribe((color: string) => {
      if (color) {
        this.column.color = color;
        this.save();
      }
    });
  }

  getItemRef(id: string): ItemComponent | undefined {
    return this.itermsRef?.find(item => item.item.id === id);
  }

  detectChanges() {
    if (this.column.config?.showTimes) this.columnTime?.update();
    this.changeDetector.detectChanges();
  }
}