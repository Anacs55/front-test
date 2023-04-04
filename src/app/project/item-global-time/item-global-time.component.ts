import { Component, Input, OnInit } from '@angular/core';
import { ItemDTO, ItemTime } from 'src/models/tasks/item';

@Component({
  selector: 'item-global-time[item]',
  templateUrl: 'item-global-time.component.html',
  styleUrls: ['item-global-time.component.sass']
})
export class ItemGlobalTimeComponent implements OnInit {
  @Input() item!: ItemDTO;

  timeRemaining = 0;
  itemTime: ItemTime = {
    total: 0,
    spent: 0,
  };

  ngOnInit() {
    this.calcTimes();
  }

  calcTimes() {
    this.itemTime.total = this.item.subtasks?.map(item => item.time?.total!).reduce((prev, curr) => prev + curr, 0)! + this.item.time!.total;
    this.itemTime.spent = this.item.subtasks?.map(item => item.time?.spent!).reduce((prev, curr) => prev + curr, 0)! + this.item.time!.spent;
    this.timeRemaining = this.itemTime.total - this.itemTime.spent
  }
}