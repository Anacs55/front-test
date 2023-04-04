import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from 'src/models/teams/team';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'team-selector[teams]',
  templateUrl: 'team-selector.component.html',
  styleUrls: ['team-selector.component.sass'],
})
export class TeamSelectorComponent {

  constructor(private sessionManager: SessionManagerService) {
    this._selectedTeam = this.sessionManager.getTeam();
  }

  @Input() teams: Team[] = [];
  _selectedTeam: Team;

  @Input('selectedTeam')
  set selectedTeam(team: Team) {
    this._selectedTeam = team;
    this.selectedTeamChange.emit(team);
  }
  @Output() selectedTeamChange = new EventEmitter<Team>();
  get selectedTeam(): Team {
    return this._selectedTeam;
  }

  compareTeams(team1: Team, team2: Team) {
    return team1.id === team2.id;
  }
}