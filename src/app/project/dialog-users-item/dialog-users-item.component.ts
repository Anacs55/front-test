import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUsersItemData } from 'src/models/tasks/item';
import { SelectableUser } from 'src/models/user';

@Component({
  selector: 'app-dialog-users-item',
  templateUrl: 'dialog-users-item.component.html',
  styleUrls: ['dialog-users-item.component.sass']
})
export class DialogUsersItemComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogUsersItemData,
    public dialogRef: MatDialogRef<DialogUsersItemComponent>,
  ) { }

  ngOnInit() {
    this.data.allUsers.forEach(user => user.selected = false);
    this.data.users.forEach(userId => this.data.allUsers.filter(user => user.id === userId)[0].selected = true);
  }

  selectUser(event: MatCheckboxChange, user: SelectableUser) {
    user.selected = event.checked;
  }

  addUsers() {
    this.dialogRef.close(this.data.allUsers.filter(user => user.selected))
  }
}