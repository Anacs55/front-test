import { Component, Input, OnInit } from '@angular/core';
import { ItemActivity } from 'src/models/activities/itemActivity';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'app-item-activity[activity]',
  templateUrl: 'item-activity.component.html',
  styleUrls: ['item-activity.component.sass']
})
export class ItemActivityComponent implements OnInit {
  constructor(
    private sessionManagerService: SessionManagerService,
  ) { }

  @Input() activity!: ItemActivity;
  member?: User;
  fullname?: string;

  ngOnInit(): void {
    this.member = this.sessionManagerService.getTeamUser(this.activity.auditory.createdBy);
    if (this.member)
      this.fullname = this.member.name + " " + this.member.lastname;
  }
}