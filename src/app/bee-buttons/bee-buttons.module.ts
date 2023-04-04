import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewButtonComponent } from './add-new-button/add-new-button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AddNewButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    AddNewButtonComponent,
  ]
})
export class BeeButtonsModule {}