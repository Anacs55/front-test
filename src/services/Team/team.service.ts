import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Email } from 'src/VOs/Email';
import { Id } from 'src/VOs/Id';
import { InviteMember } from 'src/models/teams/inviteMember';
import { Team, TeamMember } from 'src/models/teams/team';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class TeamService extends BaseService {
  constructor(private http: HttpClient) {
    super('/team')
  }

  teams: Team[] = [];
  static teamsObserver: Subject<Team[]> = new Subject<Team[]>();

  getAll = () => this.http.get<Team[]>(this.baseUrl);
  get = (id: string) => this.http.get<Team>(`${this.baseUrl}/${id}`);
  post = (model: Team) => this.http.post<void>(this.baseUrl, { model });
  put = (model: Team) => this.http.put<void>(this.baseUrl, { model });
  removeMember = (teamId: Id, memberId: Id) => this.http.delete<void>(`${this.baseUrl}/member`, { body: { team: teamId.value, member: memberId.value } });
  inviteMember = (team: Team, invites: InviteMember[]) => this.http.post<TeamMember>(`${this.baseUrl}/invite`, { team: team.id, invites });
  acceptInvite = (teamId: Id, inviteId: Id) => this.http.post<void>(`${this.baseUrl}/invite/${teamId.value}/${inviteId.value}`, undefined);
  resendInviteMember = (team: Team, email: string) => this.http.post<TeamMember>(`${this.baseUrl}/resendInvite`, { team: team.id, email });
  removeInvite = (teamId: Id, email: Email) => this.http.delete<void>(`${this.baseUrl}/invite`, { body: { team: teamId.value, email: email.value } });

  updateTeams() {
    this.getAll().subscribe(res => {
      this.teams = res;
      TeamService.teamsObserver.next(res);
    });
  }
}