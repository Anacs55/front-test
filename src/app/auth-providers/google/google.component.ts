import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { GoogleAuth } from 'src/services/Auth/GoogleAuth.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { UserService } from 'src/services/Users/users.service';
import { HomeRoute } from 'src/types/routes';

@Component({
  selector: 'google-auth[authType]',
  templateUrl: 'google.component.html',
  styleUrls: ['google.component.sass'],
})
export class GoogleComponent {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService,
    private sessionManager: SessionManagerService,
    private googleAuth: GoogleAuth,
    private analytics: AnalyticsService,
  ) { }

  @ViewChild('google') googleRef?: ElementRef;
  @Input() authType!: 'login' | 'register';

  ngAfterViewInit() {
    this.googleAuth.load(this.googleRef?.nativeElement, this.authType);
    this.googleAuth.subscribe({
      next: credential => {
        this.ngZone.run(() => {
          const method = this.authType === 'login' ? this.userService.googleLogin(credential) : this.userService.googleRegister(credential);
          method.subscribe({
            next: res => {
              this.sessionManager.login(res);

              if (this.authType === 'register') this.analytics.userRegistered(res.user, 'google');
              else if (this.authType === 'login') this.analytics.userLogin(res.user, 'google');

              this.router.navigateByUrl(HomeRoute);
            },
            error: err => {
              // TODO handle error
            },
          });
        });
      }, error: err => {
        // TODO handle error
      },
    });
  }

  ngOnDestroy() {
    this.googleAuth.remove(this.googleRef?.nativeElement);
  }
}