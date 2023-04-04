import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { generateAuditory } from 'src/models/activities/itemActivity';
import { FileDTO } from 'src/models/attachments/attachment';
import { ItemDTO } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { AttachmentService } from 'src/services/Attachments/attachment.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { Id } from 'src/VOs/Id';

@Component({
  selector: 'attachments[item][projectId]',
  templateUrl: 'attachments.component.html',
  styleUrls: ['attachments.component.sass'],
})
export class AttachmentsComponent implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
    private attachmentService: AttachmentService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  @Input() projectId!: string;
  @Input() item!: ItemDTO;

  user: User = this.sessionManager.getUser()!;
  viewList: boolean = false;
  attachments: FileDTO[] = [];
  loadingAttachment: FileDTO = {
    id: 'loading',
    name: 'LOADING',
    type: 'loading',
    size: 0,
    auditory: {
      createdAt: 0,
      createdBy: '',
    },
  };

  ngOnInit() {
    this.updateAttachments();
  }

  updateAttachments() {
    this.attachmentService.getAllByItemId(this.item.id).subscribe(res => this.attachments = res);
  }

  addAttachment(event: any) {
    const file: File = event.target.files[0];
    this.addFile(file);
    event.target.value = '';
  }

  addFile(file: File) {
    if (!file || this.attachments.filter(attachment => attachment.name === file.name).length > 0) {
      const translation = this.translate.instant('activities.filerepeat')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      return;
    };
    if (file.size > 1024 * 1024) {
      const translation = this.translate.instant('activities.filesize')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      return;
    }
    this.attachments.push(this.loadingAttachment);
    const fileId = Id.generate().value;
    this.attachmentService.create(this.item, fileId, file).subscribe({
      next: () => {
        const attachment: FileDTO = {
          id: fileId,
          name: file.name,
          type: file.type,
          size: file.size,
          auditory: generateAuditory(this.user)
        }
        const index = this.attachments.findIndex(attachment => attachment.id !== this.loadingAttachment.id);
        this.attachments[index] = attachment;
        this.updateAttachments();
      }
    });
  }

  addFileDTO(file: FileDTO) {
    this.attachments.push(file);
  }

  delFileId(file: string) {
    this.attachments = this.attachments.filter(attachment => attachment.id !== file);
  }

  switchViewMode() {
    this.viewList = !this.viewList;
  }

  removeFile(file: FileDTO) {
    this.attachments = this.attachments.filter(attachment => attachment.id !== file.id);
  }
}