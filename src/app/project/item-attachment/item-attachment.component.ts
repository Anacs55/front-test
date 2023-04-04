import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { FileDTO } from 'src/models/attachments/attachment';
import { User } from 'src/models/user';
import { AttachmentService } from 'src/services/Attachments/attachment.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { DialogAttachmentComponent } from '../dialog-attachments/dialog-attachment.component';
import { DialogDeleteAttachmentComponent } from '../dialog-delete-attachment/dialog-delete-attachment.component';

@Component({
  selector: 'item-attachment[attachment][itemId][projectId]',
  templateUrl: 'item-attachment.component.html',
  styleUrls: ['item-attachment.component.sass']
})
export class ItemAttachmentComponent implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
    private dialog: MatDialog,
    private attachmentService: AttachmentService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) { }

  @Input() attachment!: FileDTO;
  @Input() itemId!: string;
  @Input() projectId!: string;

  activeForm: boolean = false;
  name: string = "";
  filePath: string = '';
  downloadPath: string = '';
  fileType: string = '';
  deleteMode: boolean = false;

  user: User = this.sessionManager.getUser()!;

  get isImage() {
    return this.attachment.type.startsWith('image');
  }

  get isPDF() {
    return this.attachment.type.includes('pdf');
  }

  get hasPreview() {
    return this.isImage || this.isPDF;
  }

  ngOnInit() {
    this.name = this.attachment.name;
    this.filePath = `${environment.apiUrl}/file/${this.projectId}/${this.attachment.id}`;
    this.downloadPath = `${environment.apiUrl}/file/download/${this.projectId}/${this.attachment.id}`;
    this.fileType = this.attachment.type.split('/')[0];
  }

  previewFile() {
    if (this.attachment.id === "loading") return;
    if (!this.hasPreview) {
      window.open(this.filePath, '_blank', 'noopener, noreferrer')
      return;
    }
    this.dialog.open(DialogAttachmentComponent, {
      data: {
        attachment: this.attachment,
        itemId: this.itemId,
        projectId: this.projectId,
      }
    });
  }

  changeName(input: any) {
    if (this.attachment.id === "loading") return;
    if (!this.attachment.id) return;
    this.attachmentService.edit(this.attachment).subscribe(() => {
      this.attachment.name = this.name;
      const translation = this.translate.instant('modals.createProject.updateProject')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      input.blur();
    });
    input.blur();
  }

  openForm(input: any, active: boolean) {
    this.activeForm = active;
    if (this.activeForm)
      setTimeout(() => input.focus(), input.select(), (input.disabled = false));
  }

  deleteFile() {
    if (this.attachment.id === "loading") return;
    if (!this.attachment.id) return;
    this.dialog.open(DialogDeleteAttachmentComponent, {
      data: {
        attachment: this.attachment,
        itemId: this.itemId,
      }
    });
  }
}
