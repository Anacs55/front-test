import { Component, Input, OnInit } from '@angular/core';
import { ItemDTO, ItemTime } from 'src/models/tasks/item';

@Component({
  selector: 'item-tiny-global-time[item]',
  templateUrl: 'item-tiny-global-time.component.html',
  styleUrls: ['item-tiny-global-time.component.sass'],
})
export class ItemTinyGlobalTimeComponent implements OnInit {

  @Input() item!: ItemDTO;

  timeRemaining = 0;

  itemTime: ItemTime = {
    total: 0,
    spent: 0,
  };

  ngOnInit(): void {
    this.calcTimes();
  }

  public calcTimes() {
    this.itemTime.total = this.item.subtasks?.map(item => item.time?.total).reduce((prev, curr) => prev + curr, 0)! + this.item.time.total;
    if (isNaN(this.itemTime.total)) this.itemTime.total = 0;

    this.itemTime.spent = this.item.subtasks?.map(item => item.time?.spent).reduce((prev, curr) => prev + curr, 0)! + this.item.time.spent;
    if (isNaN(this.itemTime.spent)) this.itemTime.spent = 0;

    this.timeRemaining = this.itemTime.total - this.itemTime.spent;
  }
}