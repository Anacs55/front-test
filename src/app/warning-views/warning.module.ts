import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorerrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { WarningScreenComponent } from './warning-screen/warning-screen.component';
import { InvitationLoadingScreenComponent } from './invitation-loading-screen/invitation-loading-screen.component';
import { WarningRoutingModule } from './warning-routing.module';
import { TranslatableModule } from '../TranslatableModule';


@NgModule({
  declarations: [
    WarningScreenComponent,
    InvitationLoadingScreenComponent,
    ErrorerrorNotFoundComponent,
  ],
  imports: [
    WarningRoutingModule,
   
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/warnings/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ],
  exports: [
    WarningScreenComponent,
    InvitationLoadingScreenComponent,
    ErrorerrorNotFoundComponent,
  ],
})
export class WarningModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}