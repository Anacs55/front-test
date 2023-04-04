import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

@NgModule({
  declarations: [
    GanttComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GanttComponent,
  ],
})
export class GanttModule { }