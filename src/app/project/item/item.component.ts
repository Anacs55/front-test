import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ItemDTO, Priority } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { ItemService } from 'src/services/Item/item.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { VisibilityService } from 'src/services/Visibility/visibility.service';
import { ContextMenuComponent } from '../../bee-components/contextmenu/contextmenu.component';
import { DialogShareLinkComponent } from '../../projects/dialog-share-link/dialog-share-link.component';
import { DialogItemComponent } from '../dialog-item/dialog-item.component';
import { ItemTinyGlobalTimeComponent } from '../item-tiny-global-time/item-tiny-global-time.component';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'item[item][columnId][projectId]',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private visibilityService: VisibilityService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService,
    private analyticsService: AnalyticsService,
  ) { }

  private allUsers: User[] = SessionManagerService.selectedTeam?.members.map(member => member.user) ?? [];

  @Input() item!: ItemDTO;

  @Input() columnId!: string;
  @Input() projectId!: string;
  @Input() addedUsers: User[] = [];

  @Output() deleteItem = new EventEmitter<ItemDTO>();
  @Output() updateItem = new EventEmitter<ItemDTO>();

  @ViewChild('contextMenu') contextMenu?: ContextMenuComponent;
  @ViewChild(ItemTinyGlobalTimeComponent) tinyTime?: ItemTinyGlobalTimeComponent;
  @ViewChild(TagsComponent) tagsRef?: TagsComponent;

  activeForm: boolean = false;
  itemName: string = '';
  activeTimes: boolean = false
  totalItemTime: number = 0;
  spentItemTime: number = 0;
  progress: number = 0;
  backgroundColor: string = '';
  priorityColor: string = '';
  menuPosition: { x: number, y: number } = { x: 0, y: 0 };

  // Only update his value to true when the item is visible and never returns to false
  fistVisible: boolean = false;

  ngOnInit() {
    if (this.item) this.itemName = this.item.name;
  }

  ngAfterContentInit() {
    this.visibilityService.elementInSight(this.elementRef).subscribe(visible => {
      if (!visible) return;
      if (!this.fistVisible) {
        this.fistVisible = true;
        this.calcPercentage();
        this.colorProgress();
        this.loadUsers();
        this.changeDetector.detectChanges();
      }
    });
    this.route.paramMap.subscribe(paramMap => {
      const itemId = paramMap.get('itemId');
      if (itemId === this.item.id) this.openItem(this.item);
    });
  }

  goToItem(item: ItemDTO) {
    let url = this.router.createUrlTree([], { relativeTo: this.route }).toString();
    if (url.includes(this.item.id)) url = url.replace('/' + this.item.id, '');
    const itemUrl = url + '/' + item.id;
    this.location.go(itemUrl);
    this.openItem(item);
  }

  removeItemIdFromUrl() {
    let url = this.router.createUrlTree([], { relativeTo: this.route }).toString();
    if (url.includes(this.item.id)) url = url.replace('/' + this.item.id, '');
    this.location.go(url);
  }

  private openItem(item: ItemDTO) {
    this.dialog.open(DialogItemComponent, {
      width: '1000px',
      data: { item, projectId: this.projectId },
    }).afterClosed().subscribe(item => {
      this.item = item;
      this.tagsRef?.updateTags();
      this.calcPercentage();
      this.colorProgress();
      this.removeItemIdFromUrl();
      this.loadUsers();
      this.tinyTime?.calcTimes();
      this.changeDetector.detectChanges();
    });
  }

  changeItemName(input: any, item: ItemDTO) {
    if (this.item.name !== this.itemName) {
      this.analyticsService.itemChangeName(this.item, this.itemName);
      this.itemName = this.item.name;
      this.itemService.update(item).subscribe(() => {
        const translation = this.translate.instant('task.titleUpdated')
        this.snackBar.open(translation, 'Ok', { duration: 2000 });
      })
    }
    input.blur();
  }

  calcPercentage(sendUpdate: boolean = false) {
    if (!this.item.time) return;
    this.totalItemTime = this.item.time.total + (this.item.subtasks?.map(item => item.time.total).reduce((prev, curr) => prev + curr, 0) || 0);
    this.spentItemTime = this.item.time.spent + (this.item.subtasks?.map(item => item.time.spent).reduce((prev, curr) => prev + curr, 0) || 0);
    this.progress = ((this.spentItemTime * 100) / this.totalItemTime) || 0;
    if (sendUpdate) this.updateItem.emit(this.item);
  }

  colorProgress() {
    if (this.progress === 0) return;
    else if (this.progress <= 40) this.backgroundColor = '#F6A8A8';
    else if (this.progress > 40 && this.progress <= 75) this.backgroundColor = '#FFD700';
    else if (this.progress > 75 && this.progress <= 100) this.backgroundColor = '#32CD32';
    else if (this.progress > 100) this.backgroundColor = 'red';
  }

  loadUsers() {
    this.addedUsers = [];
    this.item.userIds?.forEach(userId => {
      this.addedUsers.push(...this.allUsers.filter(user => user.id === userId));
    });
  }

  openContextMenu(event: any) {
    event.preventDefault();
    this.menuPosition.x = event.layerX;
    this.menuPosition.y = event.layerY;
    this.contextMenu?.openMenu(this.menuPosition);
  }

  changePriority(priority: Priority, sendUpdate: boolean = false) {
    this.analyticsService.itemChangePriority(this.item, priority);
    this.item.priority = priority.value;
    this.itemService.update(this.item).subscribe(() => {
      const translation = this.translate.instant('priority.updated')
      this.snackBar.open(translation, 'Ok', { duration: 2000 });
      if (sendUpdate) this.updateItem.emit(this.item);
    });
  }

  clickPriority(event: any) {
    event.stopPropagation();
  }

  /* menu options */
  openForm(input: any) {
    this.activeForm = !this.activeForm
    if (this.activeForm) setTimeout(() => input.focus(), input.select(), input.disabled = false);
  }

  shareLink() {
    this.dialog.open(DialogShareLinkComponent, {
      width: 'fit-content',
      data: {
        type: 'Item',
        link: '',
      },
    });
  }

  itemDelete(item: ItemDTO) {
    this.itemService.deleteItem(item).subscribe({
      next: () => {
        this.deleteItem.emit(item);
        this.analyticsService.itemDelete(item);
      }
    });
  }

  detectChanges() {
    this.tinyTime?.calcTimes();
    this.calcPercentage();
    this.changeDetector.detectChanges();
  }
}