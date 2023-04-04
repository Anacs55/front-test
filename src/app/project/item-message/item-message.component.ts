import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ItemMessage } from 'src/models/activities/itemActivity';
import { TeamMember } from 'src/models/teams/team';
import { User } from 'src/models/user';
import { ActivityService } from 'src/services/Activity/activity.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'app-item-message[message]',
  templateUrl: 'item-message.component.html',
  styleUrls: ['item-message.component.sass']
})
export class ItemMessageComponent implements OnInit {
  constructor(
    private activityService: ActivityService,
    private sessionManagerService: SessionManagerService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  @Input() message!: ItemMessage;
  @Output() deleteMessage = new EventEmitter<ItemMessage>();

  user?: User = this.sessionManagerService.getUser();
  editMode = false;
  teamMembers?: TeamMember[];
  member?: User;

  ngOnInit() {
    this.member = this.sessionManagerService.getTeamUser(this.message.auditory.createdBy);
  }

  swapMode() {
    this.editMode = !this.editMode;
  }

  saveEditMessage(text: string) {
    if (!this.message.id || !text) return;
    this.message.data.text = text;
    this.message.auditory.updatedAt = new Date().getTime();
    this.activityService.edit(this.message).subscribe(() => {
      const translation = this.translate.instant('activities.updated')
      this.snackBar.open(translation, 'OK', { duration: 2000 });
    });
    this.editMode = false;
  }

  delete() {
    this.deleteMessage.emit(this.message);
  }
}