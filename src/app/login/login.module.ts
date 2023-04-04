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
import { NgxCaptchaModule } from 'ngx-captcha';
import { TranslatableModule } from '../TranslatableModule';
import { AuthProvidersModule } from '../auth-providers/auth-providers.module';
import { BeeIconsModule } from '../bee-icons/bee-icons.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,

    NgxCaptchaModule,
    AuthProvidersModule,

    LoginRoutingModule,
    BeeIconsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/login/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ],
})
export class LoginModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}