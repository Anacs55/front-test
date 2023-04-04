import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-confirm-delete[message]',
  templateUrl: 'dialog-confirm-delete.component.html',
  styleUrls: ['dialog-confirm-delete.component.sass']
})
export class DialogConfirmDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
  ) { }

  close(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}