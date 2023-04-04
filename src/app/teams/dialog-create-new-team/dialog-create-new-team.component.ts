import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Id } from 'src/VOs/Id';
import { Team } from 'src/models/teams/team';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';
import { DialogAssignProjectToTeamComponent } from '../dialog-assign-project-to-team/dialog-assign-project-to-team.component';
import { DialogInviteTeamMemberComponent } from '../dialog-invite-team-member/dialog-invite-team-member.component';

export interface DialogData {
  action: string;
}
@Component({
  selector: 'app-dialog-create-new-team',
  templateUrl: 'dialog-create-new-team.component.html',
  styleUrls: ['dialog-create-new-team.component.sass']
})
export class DialogCreateNewTeamComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCreateNewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public team: Team,
    private teamService: TeamService,
    private snackBar: MatSnackBar,
    private sessionManagerService: SessionManagerService,
    private translate: TranslateService,
    private analytics: AnalyticsService,
  ) { }

  ngOnInit(): void {
    if (this.team) {
      this.form.patchValue({
        name: this.team.name,
        description: this.team.description,
      });
    }
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  inviteMember() {
    this.dialog.open(DialogInviteTeamMemberComponent, { width: 'fit-content' });
  }

  addProject() {
    this.dialog.open(DialogAssignProjectToTeamComponent, { width: 'fit-content' });
  }

  createTeam() {
    if (this.team) {
      // Edit team
      const team: Team = { ...this.team, ...this.form.value }
      this.teamService.put(team).subscribe(res => {
        this.team = team;
        this.dialogRef.close(res);
        this.sessionManagerService.setTeam(team, true);
        this.teamService.updateTeams();
        const translation = this.translate.instant('modals.createTeam.team');
        const translation1 = this.translate.instant('modals.createTeam.edited');
        this.snackBar.open(`${translation} "${team.name}" ${translation1}`, 'OK', { duration: 2000, });
        this.analytics.teamUpdate(team);
      });

    } else {
      // Create team
      const team: Team = { ...this.form.value }
      team.id = Id.generate().value;
      this.teamService.post(team).subscribe(res => {
        this.team = team;
        this.dialogRef.close(res);
        this.teamService.updateTeams();
        const translation = this.translate.instant('modals.createTeam.team');
        const translation1 = this.translate.instant('modals.createTeam.created');
        this.snackBar.open(`${translation} "${team.name}" ${translation1}`, 'OK', { duration: 2000, });
        this.analytics.teamCreate(team);
      });
    }
  }
}
