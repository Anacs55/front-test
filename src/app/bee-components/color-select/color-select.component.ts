import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'color-select',
  templateUrl: 'color-select.component.html',
  styleUrls: ['color-select.component.sass']
})
export class ColorSelectComponent {

  @Output() colors = new EventEmitter<Colors>()

  secondColor = false;

  form: FormGroup = new FormGroup({
    color: new FormControl('#1f9cee'),
    color2: new FormControl<string | undefined>(undefined),
  });

  updateColors() {
    const { color, color2 } = this.form.value;
    this.colors.emit({ color, color2 });
  }

  addSecondColor() {
    this.secondColor = true;
    this.form.patchValue({ color2: 'black' });
    this.updateColors();
  }

  deleteSecondColor() {
    this.secondColor = false;
    this.form.patchValue({ color2: undefined });
    this.updateColors();
  }
}

export interface Colors {
  color: string
  color2: string | undefined
}