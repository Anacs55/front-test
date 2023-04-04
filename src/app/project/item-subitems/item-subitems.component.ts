import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ContextMenuComponent } from 'src/app/bee-components/contextmenu/contextmenu.component';
import { ItemDTO, ItemTime, Priorities, Priority, SubItem } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { ItemService } from 'src/services/Item/item.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { DialogShareLinkComponent } from '../../projects/dialog-share-link/dialog-share-link.component';
import { DialogUsersItemComponent } from '../dialog-users-item/dialog-users-item.component';

@Component({
  selector: 'item-subitems[item]',
  templateUrl: 'item-subitems.component.html',
  styleUrls: ['item-subitems.component.sass']
})
export class ItemSubitemsComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  @Input() item!: ItemDTO;
  @Output() updateSubTaskTime = new EventEmitter<ItemTime>();
  @ViewChild('contextMenu') contextMenu?: ContextMenuComponent;

  backgroundColor: string = '';
  allUsers: User[] = SessionManagerService.selectedTeam?.members.map(member => member.user) ?? [];
  addedUsers: User[] = [];
  menuPosition: { x: number; y: number } = { x: 500, y: 110 };

  ngOnInit() {
    this.subItemOrderByPriority()
  }

  progress(time: ItemTime) {
    const progressNumber = time.spent * 100 / (time.total === 0 ? 1 : time.total);
    if (progressNumber <= 40) this.backgroundColor = '#F6A8A8';
    else if (progressNumber > 40 && progressNumber <= 80) this.backgroundColor = '#F4D03F';
    else if (progressNumber > 80 && progressNumber <= 100) this.backgroundColor = '#76cc86';
    else if (progressNumber > 100) this.backgroundColor = 'red';
    return progressNumber.toFixed();
  }

  updateDescription(subItem: SubItem) {
    // TODO handle ws update subitem description
  }

  subItemCreate(name: string) {
    const subItem: SubItem = {
      name,
      time: { total: 0, spent: 0 },
      completed: false,
    }
    this.item?.subtasks?.push(subItem)
    this.itemService.update(this.item).subscribe()
  }

  subItemDelete(subItem: SubItem) {
    this.item.subtasks = this.item.subtasks!.filter(subItemFiltered => subItemFiltered.name !== subItem.name);
    this.itemService.update(this.item).subscribe();
  }

  timeUpdate(itemTime: ItemTime, subItem: SubItem) {
    subItem.time = itemTime;
    this.updateSubTaskTime.emit(itemTime)
  }

  save() {
    this.itemService.update(this.item).subscribe();
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

  clickPriority(event: any) {
    event.stopPropagation();
  }
  onKeydownInput(event: any) {

    event.stopPropagation();
  }

  changePriority(subItem: SubItem, priority: Priority) {
    subItem.priority = priority.value;
    this.itemService.update(this.item).subscribe(() => {
      this.subItemOrderByPriority();
      const translation = this.translate.instant('priority.updated')
      this.snackBar.open(translation, "Ok", { duration: 2000 });
    })
  }

  subItemOrderByPriority() {
    this.item.subtasks?.sort((a: SubItem, b: SubItem) => {
      const priorityA = a.priority ? Priorities.filter(priority => a.priority === priority.value)[0].priority : -1;
      const priorityB = b.priority ? Priorities.filter(priority => b.priority === priority.value)[0].priority : -1;
      if (priorityA == priorityB) return 0;
      return priorityA > priorityB ? -1 : 1;
    });
  }

  shareLink() {
    this.dialog.open(DialogShareLinkComponent, {
      width: 'fit-content',
      data: {
        type: 'SubItem',
        link: '',
      },
    });
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    // this.menuPosition.x = event.clientX;
    // this.menuPosition.y = event.clientY;
    this.contextMenu?.openMenu(this.menuPosition);
  }

  openForm(input: any) {
    setTimeout(() => input.focus(), input.select(), input.disabled = false);
  }
}