import { Component, Input, OnInit } from '@angular/core';
import { ItemDTO, ItemTime } from 'src/models/tasks/item';

@Component({
  selector: 'column-time[items]',
  templateUrl: 'column-time.component.html',
  styleUrls: ['column-time.component.sass'],
})
export class ColumnTimeComponent implements OnInit {
  @Input() items?: ItemDTO[];

  timeRemaining: number = 0;
  columnTime: ItemTime = {
    total: 0,
    spent: 0,
  };
  progressBar: number = 0;
  backgroundColor: string = '';

  ngOnInit() {
    this.update();
  }

  update() {
    this.calcTimes();
    this.progress();
  }

  private calcTimes() {
    const totalItems = this.items?.map(item => item.time.total ?? 0).reduce((prev, curr) => prev + curr, 0) || 0;
    const totalSubItems = this.items?.map(item => item.subtasks?.map(subItem => 
      subItem.time.total ?? 0).reduce((prev, curr) => prev + curr, 0)!).reduce((prev, curr) => prev + curr, 0) || 0;
      
    const spentItems = this.items?.map(item => item.time.spent ?? 0).reduce((prev, curr) => prev + curr, 0) || 0;
    const spentSubItems = this.items?.map(item => item.subtasks?.map(subItem => 
      subItem.time.spent ?? 0).reduce((prev, curr) => prev + curr, 0)!).reduce((prev, curr) => prev + curr, 0) || 0;

    this.columnTime.total = this.round(totalItems + totalSubItems);
    this.columnTime.spent = this.round(spentItems + spentSubItems);
    this.timeRemaining = this.round(this.columnTime.total - this.columnTime.spent);
    // if((this.round(this.columnTime.total - this.columnTime.spent)) <= 0) {
    //   this.timeRemaining = 0
    // } else {
    //   this.timeRemaining = this.round(this.columnTime.total - this.columnTime.spent)
    // }
  }

  private round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  private progress() {
    if (((this.columnTime.spent * 100) / this.columnTime.total) > 100){
      this.progressBar = 101
    } else {
      this.progressBar = ((this.columnTime.spent * 100) / this.columnTime.total) || 0;
    }
    // this.progressBar = ((this.columnTime.spent * 100) / this.columnTime.total) || 0;
    if(this.progressBar === 0) return;
    else if(this.progressBar <= 40) this.backgroundColor = '#F6A8A8';
    else if(this.progressBar > 40 && this.progressBar <= 80) this.backgroundColor = '#F4D03F';
    else if(this.progressBar > 80 && this.progressBar <= 100) this.backgroundColor = '#76cc86';
    else if(this.progressBar > 100) this.backgroundColor = 'red';
    else this.backgroundColor = 'red';
  }
}
