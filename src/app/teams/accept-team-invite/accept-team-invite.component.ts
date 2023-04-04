import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from 'src/services/AuthGuard/auth-guard.service';
import { TeamService } from 'src/services/Team/team.service';
import { Id } from 'src/VOs/Id';

@Component({
  selector: 'app-accept-team-invite',
  templateUrl: 'accept-team-invite.component.html',
  styleUrls: ['accept-team-invite.component.sass'],
})
export class AcceptTeamInvite implements OnInit {

  constructor(
    protected teamService: TeamService,
    protected router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authguard: AuthGuard,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const team = params.get('team');
      const token = params.get('token');
      if (!team || !token) {
        this.router.navigate(['']);
        return;
      }
      if (!this.authguard.canLoad()) {
        localStorage.setItem('teamInvitationId', team);
        localStorage.setItem('teamInvitationToken', token);
        this.router.navigate(['/login']);
        return;
      }
      this.teamService.acceptInvite(new Id(team), new Id(token)).subscribe(() => {
        this.teamService.updateTeams();
        // TODO translate
        const translation = this.translate.instant('team.joinedTeam')
        this.snackBar.open(translation, 'OK', { duration: 2000, });
        this.router.navigate(['']);
      });
    });
  }
}