import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { UserService } from 'src/services/Users/users.service';

@Component({
  selector: 'app-dialog-user-edit',
  templateUrl: 'dialog-user-edit.component.html',
  styleUrls: ['dialog-user-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogUserEditComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogUserEditComponent>,
    public dialog: MatDialog,
    private sessionManager: SessionManagerService,
    private userService: UserService
  ) {
    this.user = this.sessionManager.getUser()!;
  }

  name: string = '';
  lastName: string = '';
  user: User;

  updateProfile() {
    if(!this.user || this.name === '' || this.lastName === '')
    return;
    this.user.name = this.name
    this.user.lastname = this.lastName
    this.userService.update(this.user);
  }
}