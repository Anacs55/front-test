import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { generateItemActivity, ItemActivityDTO } from 'src/models/activities/itemActivity';
import { ItemDTO } from 'src/models/tasks/item';
import { User } from 'src/models/user';
import { ActivityService } from 'src/services/Activity/activity.service';
import { ActivitiesComponent } from '../activities/activities.component';

@Component({
  selector: 'app-item-input-message[item][user]',
  templateUrl: 'item-input-message.component.html',
  styleUrls: ['item-input-message.component.sass']
})
export class ItemInputMessageComponent {
  constructor(
    private activityService: ActivityService,
    private activitiesComponent: ActivitiesComponent,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  @Input() item!: ItemDTO;
  @Input() user!: User;

  text: string = "";
  sendMessage(text: string) {
    if (!this.item.id || !text || !this.user) return;
    const message: ItemActivityDTO = generateItemActivity(this.user, this.item, 'message', this.item.observers, { text });
    this.activityService.create(message).subscribe(() => {
      const translation = this.translate.instant('activities.created')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
      this.activitiesComponent.addActivity(message);
    });
    this.text = "";
  }
} 