import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select-color',
  templateUrl: 'dialog-select-color.component.html',
  styleUrls: ['dialog-select-color.component.sass']
})
export class DialogSelectColorComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSelectColorComponent>,
  ) { }

  color: string = '#1f9cee';

  setColor(color: string) {
    this.color = color;
  }

  selectColor(): void {
    this.dialogRef.close(this.color);
  }
}