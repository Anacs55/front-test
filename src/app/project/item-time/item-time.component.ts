import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemTime } from 'src/models/tasks/item';

@Component({
  selector: 'item-time[time]',
  templateUrl: 'item-time.component.html',
  styleUrls: ['item-time.component.sass']
})
export class ItemTimeComponent implements OnInit {
  @Input() time?: ItemTime;
  @Output() updateTime = new EventEmitter<ItemTime>();

  timeRemaining: number = 0;
  
  ngOnInit() {
    if(this.time === undefined) this.time = {
      spent: 0,
      total: 0
    };
    this.calcRemaining();
  }

  calcRemaining() {
    this.timeRemaining = this.time!.total - this.time!.spent;
    // if((this.time!.total - this.time!.spent) <= 0) {
    //   this.timeRemaining = 0
    // } else {
    //   this.timeRemaining = this.time!.total - this.time!.spent
    // }
  }

  timeUpdate() {
    this.updateTime.emit(this.time);
  } 
}