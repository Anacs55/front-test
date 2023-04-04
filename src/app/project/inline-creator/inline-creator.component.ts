import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'inline-creator',
  templateUrl: 'inline-creator.component.html',
  styleUrls: ['inline-creator.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineCreatorComponent {
  @Input()
  placeholder?: string;
  formValue: string = "";

  @Output()
  newItem = new EventEmitter<string>();

  activeForm: boolean = false;

  openForm(input: any) {
    this.activeForm = !this.activeForm;
    if (this.activeForm) setTimeout(() => input.focus(), 0);
  }

  checkCreate(event: KeyboardEvent) {
    if(event.key == 'Enter') {
      this.newItem.emit(this.formValue);
      this.formValue = '';
      this.activeForm = !this.activeForm;
    }
  }
}