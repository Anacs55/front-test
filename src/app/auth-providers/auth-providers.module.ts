import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthProvidersComponent } from './auth-providers/auth-providers.component';
import { GoogleComponent } from './google/google.component';

@NgModule({
  declarations: [
    GoogleComponent,
    AuthProvidersComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AuthProvidersComponent,
  ],
})
export class AuthProvidersModule { }