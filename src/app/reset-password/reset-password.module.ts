import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BeeIconsModule } from '../bee-icons/bee-icons.module';
import { ResetPasswordRoutingModule } from './reset-password.routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TranslatableModule } from '../TranslatableModule';

@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,

    ResetPasswordRoutingModule,

    BeeIconsModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/resetPassword/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ]
})
export class ResetPasswordModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}