import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DialogAssignToTeam } from 'src/app/projects/dialog-assign-to-team/dialog-assign-to-team.component';
import { InviteMember } from 'src/models/teams/inviteMember';
import { Team } from 'src/models/teams/team';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';

@Component({
  selector: 'app-dialog-invite-team-member',
  templateUrl: 'dialog-invite-team-member.component.html',
  styleUrls: ['dialog-invite-team-member.component.sass'],
})
export class DialogInviteTeamMemberComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogAssignToTeam>,
    private teamService: TeamService,
    private snackBar: MatSnackBar,
    private sessionManager: SessionManagerService,
    private translate: TranslateService

  ) { }


  membersToInvite: InviteMember[] = [];
  private team: Team = this.sessionManager.getTeam();
  sendingInvites: boolean = false;

  setMembersToInvite(members: InviteMember[]) {
    this.membersToInvite = members;
  }

  sendInvites() {
    this.sendingInvites = true;
    this.teamService.inviteMember(this.team, this.membersToInvite).subscribe(_ => {
      // TODO translate
      const translation = this.translate.instant('modals.inviteMembers.successInvitation')
      this.snackBar.open(translation, 'OK', { duration: 2000, });
      this.dialogRef.close(this.membersToInvite);
      this.sendingInvites = false;
    }, err => {
      this.sendingInvites = false;
    });
  }
}