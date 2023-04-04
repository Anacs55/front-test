import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FileDTO } from 'src/models/attachments/attachment';
import { AttachmentService } from 'src/services/Attachments/attachment.service';

export interface DialogDeleteAttachmentData {
  attachment: FileDTO
  itemId: string
}

@Component({
  selector: 'app-dialog-delete-attachment',
  templateUrl: './dialog-delete-attachment.component.html',
  styleUrls: ['./dialog-delete-attachment.component.sass']
})

export class DialogDeleteAttachmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogDeleteAttachmentData,
    public dialogRef: MatDialogRef<DialogDeleteAttachmentComponent>,
    private translate: TranslateService,
    private attachmentService: AttachmentService,
    private snackBar: MatSnackBar,
  ) {
    this.attachment = data.attachment;
    this.itemId = data.itemId;
  }

  @Output() public onDelete: EventEmitter<any> = new EventEmitter();

  attachment: FileDTO;
  itemId: string;

  close() {
    this.attachmentService.delete(this.itemId, this.attachment).subscribe(() => {
      this.onDelete.emit(this.attachment);
      this.dialogRef.close(confirm);
      const translation = this.translate.instant('attachments.deleted')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
    });
  }
}
