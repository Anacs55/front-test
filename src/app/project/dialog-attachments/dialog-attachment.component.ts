import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FileDTO } from 'src/models/attachments/attachment';

export interface DialogAttachmentData {
  attachment: FileDTO
  itemId: string
  projectId: string
}

@Component({
  templateUrl: 'dialog-attachment.component.html',
  styleUrls: ['dialog-attachment.component.sass'],
})
export class DialogAttachmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogAttachmentData,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.attachment = data.attachment;
    this.path = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/file/${data.projectId}/${data.attachment.id}`);
  }

  attachment: FileDTO;
  path: SafeResourceUrl;

  get isImage() {
    return this.attachment.type.startsWith('image');
  }

  get isPDF() {
    return this.attachment.type.includes('pdf');
  }

  get hasPreview() {
    return this.isImage || this.isPDF;
  }
}