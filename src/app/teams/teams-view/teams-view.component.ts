import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ContextMenuComponent } from 'src/app/bee-components/contextmenu/contextmenu.component';
import { InviteMember } from 'src/models/teams/inviteMember';
import { Team, TeamInviteMember, TeamMember } from 'src/models/teams/team';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';
import { Email } from 'src/VOs/Email';
import { Id } from 'src/VOs/Id';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogCreateNewTeamComponent } from '../dialog-create-new-team/dialog-create-new-team.component';
import { DialogInviteTeamMemberComponent } from '../dialog-invite-team-member/dialog-invite-team-member.component';

@Component({
  selector: 'app-teams-view',
  templateUrl: 'teams-view.component.html',
  styleUrls: ['teams-view.component.sass'],
})
export class TeamsView implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private sessionManager: SessionManagerService,
    private teamService: TeamService,
    private snackBar: MatSnackBar,
    private translate: TranslateService

  ) { }

  subscription!: Subscription;
  team: Team = this.sessionManager.getTeam();
  members: TeamMember[] = [];

  toDeteleMember?: TeamMember;
  selectedInviteMember?: TeamInviteMember;

  @ViewChild('memberContextMenu') memberContextMenu?: ContextMenuComponent;
  @ViewChild('inviteContextMenu') inviteContextMenu?: ContextMenuComponent;

  menuPosition: { x: number; y: number } = { x: 0, y: 0 };

  ngOnInit(): void {
    this.subscription = SessionManagerService.selectedTeamObserver.subscribe((team) => {
      this.team = team;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inviteMember() {
    this.dialog.open(DialogInviteTeamMemberComponent, { width: 'fit-content' }).afterClosed().subscribe((members: InviteMember[]) => {
      if (!members) return;
      this.team.invites.push(...members);
    });
  }

  addNewTeam() {
    this.dialog.open(DialogCreateNewTeamComponent, { width: 'fit-content' });
  }

  editTeam() {
    this.dialog.open(DialogCreateNewTeamComponent, {
      width: 'fit-content',
      data: this.team,
    });
  }

  private openContextMenu(event: MouseEvent, menu?: ContextMenuComponent) {
    event.preventDefault();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
    menu?.openMenu(this.menuPosition);
  }

  openDeleteMemberContextMenu(event: MouseEvent, member: TeamMember) {
    this.toDeteleMember = member;
    this.openContextMenu(event, this.memberContextMenu);
  }

  openInvitedMemberContextMenu(event: MouseEvent, invitedMember: TeamInviteMember) {
    this.selectedInviteMember = invitedMember;
    this.openContextMenu(event, this.inviteContextMenu);
  }

  openInviteContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
    this.inviteContextMenu?.openMenu(this.menuPosition);
  }

  deleteMember() {
    if (!this.toDeteleMember) return;
    const memberId = this.toDeteleMember.user.id;
    this.dialog.open(DialogConfirmDeleteComponent, { width: 'fit-content', data: 'modals.deleteMember.deleteMember' }).afterClosed().subscribe((result) => {
      if (!result) return;
      this.teamService.removeMember(new Id(this.team.id), new Id(memberId)).subscribe({
        next: () => {
          this.team.members = this.team.members.filter(member => member.user.id !== memberId);
          const translation = this.translate.instant('modals.deleteMember.deleteDone')
          this.snackBar.open(translation, 'OK', { duration: 2000, });
        },
        error: () => {
          const translation = this.translate.instant('modals.deleteMember.deleteError')
          this.snackBar.open(translation, 'OK', { duration: 2000, });
        }
      });
    });
  }

  resendInviteMember() {
    if (!this.selectedInviteMember) return;
    this.teamService.resendInviteMember(this.team, this.selectedInviteMember.email).subscribe({
      next: () => {
        const translation = this.translate.instant('modals.inviteMembers.inviteResentDone')
        this.snackBar.open(translation, 'OK', { duration: 2000, });
      },
      error: () => {
        const translation = this.translate.instant('modals.inviteMembers.inviteResentError')
        this.snackBar.open(translation, 'OK', { duration: 2000, });
      }
    });
  }

  deleteInvitedMember() {
    if (!this.selectedInviteMember) return;
    const email = this.selectedInviteMember.email;
    this.dialog.open(DialogConfirmDeleteComponent, { width: 'fit-content', data: 'modals.deleteMember.deleteInvited' }).afterClosed().subscribe(() => {
      this.teamService.removeInvite(new Id(this.team.id), new Email(email)).subscribe({
        next: () => {
          this.team.invites = this.team.invites.filter(invite => invite.email !== email);
          const translation = this.translate.instant('modals.inviteMembers.inviteDeleteDone')
          this.snackBar.open(translation, 'OK', { duration: 2000, });
        },
        error: () => {
          const translation = this.translate.instant('modals.inviteMembers.inviteDeleteError')
          this.snackBar.open(translation, 'OK', { duration: 2000, });
        }
      });
    });
  }
}