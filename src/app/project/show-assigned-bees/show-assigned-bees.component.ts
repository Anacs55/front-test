import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDTO } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { DialogUsersItemComponent } from '../dialog-users-item/dialog-users-item.component';

@Component({
  selector: 'show-assigned-bees[addedUsers][item]',
  templateUrl: 'show-assigned-bees.component.html',
  styleUrls: ['show-assigned-bees.component.sass']
})
export class ShowAssignedBeesComponent {

  constructor(
    public dialog: MatDialog,
  ) { }

  private allUsers: User[] = SessionManagerService.selectedTeam?.members.map(member => member.user) ?? [];
  @Input() addedUsers: User[] = [];
  @Input() item!: ItemDTO;

  itemUsersDialog() {
    this.dialog.open(DialogUsersItemComponent, {
      width: 'fit-content',
      data: {
        users: this.item.userIds,
        allUsers: this.allUsers,
      },
    })
  }

}
