import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TagColors } from 'src/models/tags';
import { Tag } from 'src/models/tasks/tag';
import { TagService } from 'src/services/Label/label.service';
import { TagsDialogData } from 'src/types/tagsDialog';
import { Id } from 'src/VOs/Id';

@Component({
  selector: 'dialog-labels',
  templateUrl: 'dialog-labels.component.html',
  styleUrls: ['dialog-labels.component.sass']
})
export class DialogLabelsComponent implements OnInit {

  constructor(
    private labelService: TagService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private readonly data: TagsDialogData,
    private dialogRef: MatDialogRef<DialogLabelsComponent>,
    private translate: TranslateService,
  ) {
    this.selectedLabels = data.tagIds;
    dialogRef.backdropClick().subscribe(() => this.close());
  }

  tagName = new FormControl('');
  tagColor: string = '';
  labels: Tag[] = TagService.tags;
  selectedLabels: string[] = [];
  readonly colors: string[] = TagColors;
  editTag?: Tag;

  ngOnInit() {
    this.updateLabels();
  }

  private updateLabels() {
    if (!this.data.projectId) return;
    this.labelService.getAllByProject(this.data.projectId).subscribe(res => this.labels = res);
  }

  changeTag(tag: Tag) {
    this.tagName.setValue(tag.name);
    this.tagColor = tag.color;
    this.editTag = tag;
  }

  selectColor(color: string) {
    this.tagColor = color;
  }

  createLabel() {
    if (!this.tagName.value || !this.tagColor || !this.data.projectId) return;
    const label: Tag = {
      id: Id.generate().value,
      name: this.tagName.value,
      color: this.tagColor,
      projectId: this.data.projectId,
    }
    this.labelService.create(label).subscribe(() => {
      const translation = this.translate.instant('labels.created')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      TagService.addTag(label);
      this.updateLabels();
      this.selectedLabels.push(label.id);
    });
  }

  updateLabel() {
    if (!this.tagName.value || !this.tagColor || !this.data.projectId) return;
    this.editTag = {
      ...this.editTag!,
      name: this.tagName.value,
      color: this.tagColor,
    };
    this.labelService.update(this.editTag).subscribe(() => {
      const translation = this.translate.instant('labels.updated')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      this.updateLabels();
      this.resetForm();
    });
  }

  deleteLabel() {
    if (!this.editTag) return;
    this.selectedLabels = this.selectedLabels.filter(id => id !== this.editTag?.id)
    this.labels = this.labels.filter(label => label.id !== this.editTag?.id);
    this.labelService.delete(this.editTag!).subscribe(() => {
      const translation = this.translate.instant('labels.deleted')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      this.updateLabels();
    });
    this.resetForm()
  }

  resetForm() {
    this.editTag = undefined;
    this.tagName.setValue('');
    this.tagColor = '';
  }

  checkSelectedLabel(label: Tag): boolean {
    return this.selectedLabels.includes(label.id);
  }

  clickLabel(event: MatCheckboxChange, label: Tag) {
    if (event.checked && !this.selectedLabels.includes(label.id)) {
      this.selectedLabels.push(label.id);
    } else if (this.selectedLabels.includes(label.id)) {
      this.selectedLabels = this.selectedLabels.filter(id => id !== label.id);
    }
  }

  close() {
    this.dialogRef.close(this.selectedLabels);
  }
}