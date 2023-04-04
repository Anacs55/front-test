import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUserEditComponent } from 'src/app/menu/dialog-user-edit/dialog-user-edit.component';
import { menus } from 'src/models/menu';
import { Team } from 'src/models/teams/team';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';
import { DialogLabelsComponent } from '../../project/dialog-labels/dialog-labels.component';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-menu[user]',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  constructor(
    private sessionManager: SessionManagerService,
    private router: Router,
    private dialog: MatDialog,
    private teamService: TeamService,
    private platform: Platform,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }

  @Input() user?: User;
  readonly menus = menus;

  teams: Team[] = [];
  _selectedTeam: Team = this.sessionManager.getTeam();

  get selectedTeam(): Team {
    return this._selectedTeam;
  }
  set selectedTeam(team: Team) {
    if (team && this._selectedTeam?.id !== team?.id) this.sessionManager.setTeam(team);
    this._selectedTeam = team;
  }

  get isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  get elementHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }

  ngOnInit() {
    TeamService.teamsObserver.subscribe(teams => {
      if (!this.selectedTeam) this.selectedTeam = teams[0];
      else {
        const selectedTeam = teams.find(t => t.id === this.selectedTeam.id);
        if (selectedTeam) this.selectedTeam = selectedTeam;
      }
      this.teams = teams;
      this.changeDetector.detectChanges();
    });
    this.teamService.updateTeams();
    if (!this.selectedTeam) {
      const firstTeam = this.teamService.teams[0];
      if (firstTeam) this.selectedTeam = firstTeam;
    }
    SessionManagerService.selectedTeamObserver.subscribe(team => {
      this._selectedTeam = team;
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    SessionManagerService.setTopMenuHeight(this.elementHeight);
  }

  openDialog() {
    this.dialog.open(DialogUserEditComponent);
  }

  openDialogLabels() {
    this.dialog.open(DialogLabelsComponent);
  }

  logout() {
    this.sessionManager.logOut();
    this.router.navigate(['/login']);
  }

  openNotifications(){
    this.dialog.open(NotificationsComponent);
  }
}