import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ItemActivityDTO } from 'src/models/activities/itemActivity';
import { ItemDTO } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { ActivityService } from 'src/services/Activity/activity.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'activities[item]',
  templateUrl: 'activities.component.html',
  styleUrls: ['activities.component.sass']
})

export class ActivitiesComponent implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
    private activityService: ActivityService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  @Input() item!: ItemDTO;

  user: User = this.sessionManager.getUser()!;
  showActivity: boolean = true;
  activities: ItemActivityDTO[] = [];

  ngOnInit() {
    this.updateActivities();
  }

  updateActivities() {
    this.activityService.getAllByItemId(this.item.id).subscribe(
      res => this.activities = res
    );
  }

  addActivity(activity: ItemActivityDTO) {
    this.activities.unshift(activity);
  }

  switchViewmode() {
    this.showActivity = !this.showActivity;
  }

  // TODO: change only to edit item activity message or move to ItemMessageComponent
  editActivity(activity: ItemActivityDTO) {
    this.activityService.edit(activity).subscribe(() => {
      const translation = this.translate.instant('activities.updated')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
    });
  }

  deleteMessage(message: ItemActivityDTO) {
    this.activityService.delete(message).subscribe(() => {
      const translation = this.translate.instant('activities.deleted')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      this.updateActivities();
      //this.activities.filter(activity => activity.id !== message.id); DOESNT WORK?
    });
  }
}