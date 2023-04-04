import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'invitation-loading-screen',
  templateUrl: 'invitation-loading-screen.component.html',
  styleUrls: ['invitation-loading-screen.component.sass']
})
export class InvitationLoadingScreenComponent implements OnInit {

  constructor() { }

  @Input()
  screenText?: string;

  ngOnInit(): void {
  }

}
