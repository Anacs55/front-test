import { Component, Input } from '@angular/core';

@Component({
  selector: 'bee-add-new-button[click][text]',
  templateUrl: 'add-new-button.component.html',
  styleUrls: ['add-new-button.component.sass']
})
export class AddNewButtonComponent {
  constructor() {}

  @Input() click: () => void = () => {};
  @Input() text: string = '';
  @Input() icon = 'add_circle';
}
