import { Component, Input, OnInit } from '@angular/core';
import { ActivityService } from 'src/services/Activity/activity.service';
import { ItemActivityDTO } from 'src/models/activities/itemActivity';
import { ItemDTO } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-content-notification',
  templateUrl: './content-notification.component.html',
  styleUrls: ['./content-notification.component.sass']
})
export class ContentNotificationComponent implements OnInit{

  constructor(
    private sessionManager: SessionManagerService,
    private activityService: ActivityService
  ){}

  numNot = 0;
  have:boolean = true;

  @Input() item!: ItemDTO;
  user: User = this.sessionManager.getUser()!;
  notifications: ItemActivityDTO[] = [];

  ngOnInit() {
    this.updateNotifications();
  }

  updateNotifications(){
    this.activityService.getAllNotification().subscribe(
      res => this.notifications = res,
      res => this.numNot = res.length,
    );
  }

  haveNotification(){
    if(this.numNot == 0){
      this.have = false;
    } else {
      this.have = true;
    }
  }

}
