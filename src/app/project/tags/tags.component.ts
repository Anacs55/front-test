import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/models/tasks/tag';
import { TagService } from 'src/services/Label/label.service';

@Component({
  selector: 'tags[ids]',
  templateUrl: 'tags.component.html',
  styleUrls: ['tags.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TagsComponent implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) { }

  private _ids?: string[];

  get ids() {
    return this._ids;
  }
  @Input()
  set ids(ids: string[] | undefined) {
    this._ids = ids;
    this.updateTags();
  }

  tags?: Tag[];

  ngOnInit(): void {
    this.updateTags();
    TagService.tagsObserver.subscribe(() => this.updateTags());
  }

  public updateTags() {
    this.tags = this.ids ? TagService.getTags(this.ids) : undefined;
    this.changeDetector.detectChanges();
  }
}