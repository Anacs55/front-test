import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeeChipsComponent } from './bee-chips.component';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    BeeChipsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  exports: [
    BeeChipsComponent,
  ]
})
export class BeeChipsModule { }
