import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'select-column-color',
  templateUrl: 'select-column-color.component.html',
  styleUrls: ['select-column-color.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectColumnColorComponent {
 
  @Output() color = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    color: new FormControl('#fffffc'),
  });

  colorsValue: string[] = [
    '#ffffff', // white
    '#FFD6D6', // red
    '#FFDEC2', // orange
    '#FFFBAD', // yellow
    '#CEFFC2', // green
    '#C2FEFF', // light blue
    '#E0D6FF', // indigo
    '#FCC2F7', // violet
    '#E0E0E0', // grey
    '#fff1d0', // beige
    '#e9edc9', // soft green
    '#eddcd2', // soft brown
  ];
  standardColor: string = '';

  setColor(color: string) {
    this.form.patchValue({ color });
  }

  updateColors() {
    const { color } = this.form.value ;
    this.color.emit(color);
    
  }
  
  selectColor(color: string) {
    this.standardColor = color;
    this.color.emit(color);
  }
}