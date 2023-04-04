import { Component, OnInit } from '@angular/core';
import { Team, TeamMember } from 'src/models/teams/team';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';

@Component({
  selector: 'app-dialog-assign-to-team',
  templateUrl: 'dialog-assign-to-team.component.html',
  styleUrls: ['dialog-assign-to-team.component.sass'],
})
export class DialogAssignToTeam implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
    private teamService: TeamService
  ) { }

  teams: Team[] = [];
  members: TeamMember[] = [];
  private _selectedTeam: Team = this.sessionManager.getTeam();

  get selectedTeam(): Team {
    return this._selectedTeam;
  }
  set selectedTeam(team: Team) {
    if (!team || this._selectedTeam?.id === team.id) return;
    this._selectedTeam = team;
  }

  ngOnInit() {
    TeamService.teamsObserver.subscribe((teams) => {
      if (!this.selectedTeam) this.selectedTeam = this.teams[0];
      this.teams = teams;
    });
    this.teamService.updateTeams();
    if (!this.selectedTeam) {
      const sessionTeam = this.sessionManager.getTeam();
      if (sessionTeam) this.selectedTeam = sessionTeam;
    }
  }
}
