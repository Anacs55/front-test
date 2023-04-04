import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/AuthGuard/auth-guard.service';
import { AcceptTeamInvite } from './accept-team-invite/accept-team-invite.component';
import { TeamsView } from './teams-view/teams-view.component';

const routes: Routes = [
  { path: '', canLoad: [AuthGuard], component: TeamsView },
  { path: 'invite/:team/:token', component: AcceptTeamInvite },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }