import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ContextMenuComponent } from 'src/app/bee-components/contextmenu/contextmenu.component';
import { DialogLabelsComponent } from 'src/app/project/dialog-labels/dialog-labels.component';
import { DialogItemData, ItemDate, ItemDTO, ItemTime, Priority } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { EventListenerService } from 'src/services/EventListener/eventListener.service';
import { ItemService } from 'src/services/Item/item.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { WebSocketService } from 'src/services/WebSocket/web-socket.service';
import { DialogShareLinkComponent } from '../../projects/dialog-share-link/dialog-share-link.component';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { DialogUsersItemComponent } from '../dialog-users-item/dialog-users-item.component';
import { ItemGlobalTimeComponent } from '../item-global-time/item-global-time.component';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'dialog-item',
  templateUrl: 'dialog-item.component.html',
  styleUrls: ['dialog-item.component.sass'],
})
export class DialogItemComponent implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialogRef<DialogItemComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: DialogItemData,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private webSocketService: WebSocketService<any>,
    private eventListenerService: EventListenerService,
    private translate: TranslateService,
    private analyticsService: AnalyticsService,
  ) {
    this.item = data.item;
    this.projectId = data.projectId;
    this.item.projectId = data.projectId;
    this._item = { ...this.item };
  }

  @Output() deleteItem = new EventEmitter<ItemDTO>();

  @ViewChild('globalItemTime') globalItemTime?: ItemGlobalTimeComponent;
  @ViewChild('contextMenu') contextMenu?: ContextMenuComponent;
  @ViewChild('tags') tagsRef?: TagsComponent;
  @ViewChild('attachments') attachmentsRef?: AttachmentsComponent;

  menuPosition: { x: number; y: number } = { x: 40, y: 40 };

  item: ItemDTO;
  private _item: ItemDTO;
  projectId: string;
  usersSubscription?: Subscription;
  allUsers: User[] = SessionManagerService.selectedTeam?.members.map(member => member.user) ?? [];
  addedUsers: User[] = [];
  activeTimes: boolean = false
  activeForm: boolean = false;
  itemName: string = '';
  membersName: string = '';
  arrayLength: number = 0;

  pasteEvent: any;

  ngOnInit() {
    if (this.item) this.itemName = this.item.name;
    this.updateClone();
    this.viewTimes();
    this.loadUsers();
    this.handleWS();
    this.pasteEvent = this.eventListenerService.add<ClipboardEvent>('paste').subscribe(e => {
      const files = e.clipboardData?.files;
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.attachmentsRef?.addFile(file);
      }
    });
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
    this.close();
    this.webSocketService.leaveItemUpdates(this.projectId, this.item.id);
    this.pasteEvent.unsubscribe();
  }

  async handleWS() {
    await this.webSocketService.waitUntilOpen();
    this.webSocketService.joinItemUpdates(this.projectId, this.item.id);
    this.webSocketService.subscribe((event) => {
      switch (event.type) {
        case 'updateItemDescription':
          if (event.projectId === this.projectId && event.itemId === this.item.id) {
            this.item.description = event.data;
          }
          break;
        case 'addItemFile':
          this.attachmentsRef?.addFileDTO(event.file);
          break;
        case 'delItemFile':
          this.attachmentsRef?.delFileId(event.fileId);
          break;
      }
    });
  }

  updateItemDescription() {
    this.webSocketService.sendItemDescriptionUpdate(this.projectId, this.item.id, this.item.description ?? '');
  }

  labelsDialog() {
    this.dialog.open(DialogLabelsComponent, {
      data: {
        tagIds: this.item.tags,
        projectId: this.projectId,
      }
    }).afterClosed().subscribe((tagIds: string[]) => {
      if (!tagIds) return;
      this.item.tags = tagIds;
      this.tagsRef?.updateTags();
      this.save();
    });
  }

  itemUsersDialog() {
    this.dialog.open(DialogUsersItemComponent, {
      width: 'fit-content',
      data: {
        users: this.item.userIds,
        allUsers: this.allUsers,
      },
    }).afterClosed().subscribe((res: User[]) => {
      if (!res) return;
      this.addedUsers = res;
      this.item.userIds = this.addedUsers?.map(user => user.id);
      this.save();
    });
  }

  loadUsers() {
    this.addedUsers = [];
    this._item.userIds?.forEach(userId => {
      this.addedUsers.push(...this.allUsers.filter(user => user.id === userId));
    });
  }

  viewTimes() {
    if (this.item.subtasks!.length > 0) this.activeTimes = !this.activeTimes
  }

  //UPDATE FUNCTIONS
  timeUpdate(itemTime: ItemTime) {
    this.item.time = itemTime;
    this.globalItemTime?.calcTimes();
  }

  subTaskTimeUpdate() {
    this.globalItemTime?.calcTimes();
  }

  dateUpdate(itemDate: ItemDate) {
    this.item.date = itemDate;
    this.itemService.update(this.item).subscribe();
  }

  //TODO check if remove
  private updateClone() {
    this._item = {
      ...this.item,
      tags: this.item.tags ? [...this.item.tags] : undefined,
    };
  }

  save() {
    if (JSON.stringify(this._item) !== JSON.stringify(this.item)) {
      this.itemService.update(this.item).subscribe(() => {
        const translation = this.translate.instant('task.task')
        const translation1 = this.translate.instant('task.saved')
        this.snackBar.open(`${translation} "${this.item.name}" ${translation1}`, 'OK', { duration: 2000, });
        this.updateClone();
      });
    }
  }

  timeSave() {
    this.itemService.update(this.item).subscribe({
      next: () => this.analyticsService.itemChangeTime(this.item),
    });
  }

  close() {
    this.dialogRef.close(this.item);
  }

  saveAndClose() {
    this.save();
    this.close();
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

  openItemNameForm(input: any) {
    this.activeForm = !this.activeForm;
    if (this.activeForm) {
      setTimeout(() => input.focus(), input.select(), input.disabled = false);
    }
    this.saveItemName();
  }

  changeItemName(input: any) {
    input.blur();
    this.saveItemName();
  }

  undoItemName() {
    this.item.name = this.itemName;
  }

  saveItemName() {
    if (this.item.name === this.itemName) return;
    this.itemName = this.item.name;
    this.itemService.update(this.item).subscribe(() => {
      const translation = this.translate.instant('task.titleUpdated')
      this.snackBar.open(translation, "Ok", { duration: 2000 })
    });
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    // this.menuPosition.x = event.clientX;
    // this.menuPosition.y = event.clientY;
    this.contextMenu?.openMenu(this.menuPosition);
  }

  itemDelete(item: ItemDTO) {
    this.itemService.deleteItem(item).subscribe({
      next: () => {
        this.deleteItem.emit(item);
        this.analyticsService.itemDelete(item);
      }
    });
    this.saveAndClose();
  }

  changePriority(priority: Priority) {
    this.analyticsService.itemChangePriority(this.item, priority);
    this.item.priority = priority.value;
    this.itemService.update(this.item).subscribe(() => {
      const translation = this.translate.instant('priority.updated')
      this.snackBar.open(translation, "Ok", { duration: 2000 })
    });
  }
}