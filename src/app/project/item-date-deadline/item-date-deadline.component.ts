import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-date-deadline',
  templateUrl: 'item-date-deadline.component.html',
  styleUrls: ['item-date-deadline.component.sass']
})
export class ItemDateDeadlineComponent implements OnInit {

  @Input() deadline?: number;

  readonly currentDate = new Date().getTime();
  readonly dayInMs = 1000 * 60 * 60 * 24;
  backgroundColor: string = '';

  ngOnInit(): void {
    this.dateColor();
  }

  dateColor() {
    if (!this.deadline) return;
    const remaining = Math.ceil((this.deadline - this.currentDate) / this.dayInMs);
    if (remaining <= 0) this.backgroundColor = '#f5b7b1';
    else if (remaining >= 1 && remaining <= 2) this.backgroundColor = '#f9e79f';
    else if (remaining > 2) this.backgroundColor = '#abebc6';
  }
}