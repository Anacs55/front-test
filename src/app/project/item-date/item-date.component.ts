import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemDate, ItemDateDates } from 'src/models/tasks/item';

@Component({
  selector: 'item-date[date]',
  templateUrl: 'item-date.component.html',
  styleUrls: ['item-date.component.sass']
})

export class ItemDateComponent implements OnInit{
  @Input() date?: ItemDate;
  dates: ItemDateDates = {};

  @Output() updateDate = new EventEmitter<ItemDate>();

  remaining: number = 0;
  activeDate: boolean = false;
  backgroundColor: string = 'none';
  readonly currentDate = new Date().getTime();
  readonly dayInMs = 1000 * 60 * 60 * 24;

  ngOnInit() {
    if (!this.date) {
      this.date = {};
      return;
    }
    this.dates.start = this.date?.start ? new Date(this.date?.start) : undefined;
    this.dates.end = this.date?.end ? new Date(this.date?.end) : undefined;
    this.calcRemaining();
  }

  update() {
    this.saveToDate();
    this.dateUpdate();
    this.calcRemaining();
  }

  private saveToDate() {
    if(this.dates?.start) this.date!.start = this.dates?.start?.getTime();
    if(this.dates?.end) this.date!.end = this.dates?.end?.getTime();
  }

  private calcRemaining() {
    if(!this.dates.end || !this.dates.start) return;
    this.remaining = Math.ceil((this.dates.end.getTime() - this.currentDate) / this.dayInMs);
    this.backgroundColor = this.remaining < 0 ? '#EC7063' : '#58D68D';
    this.activeDate = !!this.date;
  }

  deleteDate() {
    this.date = {};
    this.dates = {};
    this.dateUpdate();
    this.activeDate = !this.activeDate;
  }

  dateUpdate() {
    this.updateDate.emit(this.date);
  }
}
