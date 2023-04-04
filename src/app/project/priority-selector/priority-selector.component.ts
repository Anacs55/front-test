import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Priorities, Priority } from 'src/models/tasks/item';

@Component({
  selector: 'priority-selector[priority]',
  templateUrl: 'priority-selector.component.html',
  styleUrls: ['priority-selector.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrioritySelectorComponent {

  readonly itemPriorities = Priorities;
  private _priority?: string;

  @Input()
  set priority(priority: string | undefined) {
    this._priority = priority;
    this.updateColor();
  }
  @Output() onChange = new EventEmitter<Priority>();

  readonly defaultColor = '#A1A1DD';
  priorityColor: string = this.defaultColor;

  updateColor() {
    if (!this._priority) {
      this.priorityColor = this.defaultColor;
      return;
    }
    const color = this.itemPriorities.filter(priority => priority.value === this._priority);
    this.priorityColor = color.length === 0 ? this.defaultColor : color[0].color;
  }

  changePriority(priority: Priority) {
    this._priority = priority.value;
    this.onChange.emit(priority);
  }
}