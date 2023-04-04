import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from 'src/models/tasks/tag';

@Component({
  selector: 'tag[tag]',
  templateUrl: 'tag.component.html',
  styleUrls: ['tag.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TagComponent {
  @Input() tag!: Tag;
}