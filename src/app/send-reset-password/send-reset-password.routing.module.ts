import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendResetPasswordComponent } from './send-reset-password/send-reset-password.component';

const routes: Routes = [
  { path: '', component: SendResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendResetPasswordRoutingModule { }