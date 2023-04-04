import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/AuthGuard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'signUp', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'reset', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'resetPassword', loadChildren: () => import('./send-reset-password/send-reset-password.module').then(m => m.SendResetPasswordModule) },
  { path: 'project', canLoad: [AuthGuard], loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
  { path: 'warning', canLoad: [AuthGuard], loadChildren: () => import('./warning-views/warning.module').then(m => m.WarningModule) },
  { path: '**', redirectTo: 'warning/NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { } 