import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareData } from 'src/types/shareType';


@Component({
  selector: 'app-dialog-share-link',
  templateUrl: 'dialog-share-link.component.html',
  styleUrls: ['dialog-share-link.component.sass'],
})
export class DialogShareLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogShareLinkComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public shareData: ShareData,
  ) {}

  getTitle() {
    switch (this.shareData.type) {
      case 'Project':
        return 'Share Project';
        case 'Item':
        return 'Share Item'; 
        case 'SubItem':
        return 'Share SubItem';
      default:
        return 'Share';
    }
  } 
}