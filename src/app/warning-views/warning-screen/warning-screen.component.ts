import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'warning-screen',
  templateUrl: 'warning-screen.component.html',
  styleUrls: ['warning-screen.component.sass']
})
export class WarningScreenComponent implements OnInit {

  constructor() { }

  @Input()
  screenText?: string;

  ngOnInit(): void {
  }

}
