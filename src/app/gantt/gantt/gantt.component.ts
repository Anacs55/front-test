import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gantt',
  templateUrl: 'gantt.component.html',
  styleUrls: ['gantt.component.sass']
})
export class GanttComponent implements OnInit {

  @Input() dayStart: string = '';
  @Input() dayEnd: string = '';
  @Input() tasks: any;
  @Input() theme: 'material' | 'gradient' = 'material';
  dayStartHour: number = 0;
  today = new Date();
  selectedDate = this.today;
  workingHours: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.prepareChart();
    this.prepareTasks();
  }

  prepareChart() {
    this.dayStartHour = this.getHourFromTime(this.dayStart);
    this.workingHours = this.diffFromTime(this.dayEnd, this.dayStart, 'hours') + 2;
  }

  prepareTasks() {
    this.tasks.map((task: any) => {
      task.width = this.diffFromTime(task.end, task.start, 'minutes') * 2;
      task.offset = this.diffFromTime(task.start, this.dayStart, 'minutes') * 2;
      if (task.statusList) {
        task.statusList.map((status: any, index: number) => {
          status.offset =
            this.diffFromTime(status.start, this.dayStart, 'minutes') * 2;
          if (task.statusList[index + 1] && task.statusList[index + 1].start) {
            status.end = task.statusList[index + 1].start;
            status.width =
              this.diffFromTime(status.end, status.start, 'minutes') * 2;
          }
        });
      }
    });
  }

  onTaskClick(clickedTask: any) {
    if (clickedTask.isParent) {
      this.tasks.filter((task: any) => {
        if (task.parentID === clickedTask.id) {
          task.isHidden = !task.isHidden;
          clickedTask.active = !clickedTask.active;
        }
      });
    }
  }

  getHourFromTime(time: string) {
    return Number(time.split(':')[0]);
  }

  getMinuteFromTime(time: string) {
    return Number(time.split(':')[1]);
  }
}