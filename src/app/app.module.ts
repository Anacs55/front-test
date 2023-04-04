import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from "src/environments/environment";
import { AppHttpInterceptor } from 'src/interceptors/http';
import { AbsoluteValuePipe } from "src/pipes/AbsoluteNumber/absolute-value.pipe";
import { AuthGuard } from 'src/services/AuthGuard/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from "./menu/menu.module";
import { TranslatableModule } from "./TranslatableModule";


@NgModule({
  declarations: [
    AppComponent,
    AbsoluteValuePipe,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSnackBarModule,

    MenuModule,
    MatIconModule,
    AppRoutingModule,

    HttpClientModule,
    NgxCaptchaModule,

    MatNativeDateModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/', '.json'),
        deps: [HttpClient]
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}