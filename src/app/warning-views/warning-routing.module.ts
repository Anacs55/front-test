import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorerrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { WarningScreenComponent } from './warning-screen/warning-screen.component';
import { InvitationLoadingScreenComponent } from './invitation-loading-screen/invitation-loading-screen.component';

const routes: Routes = [
  { path: '', component: WarningScreenComponent },
  { path: 'error', component: ErrorerrorNotFoundComponent },
  { path: 'invitation-loading', component: InvitationLoadingScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarningRoutingModule { }