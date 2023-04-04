import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { UserService } from 'src/services/Users/users.service';
import { HomeRoute } from 'src/types/routes';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(
    protected userService: UserService,
    protected reCaptchaService: ReCaptchaV3Service,
    protected sessionManager: SessionManagerService,
    private router: Router,
    private analytics: AnalyticsService,
  ) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    pass: new FormControl(),
  });
  error?: string;

  ngOnInit() {
    const user = this.sessionManager.getUser();
    if (user) this.router.navigateByUrl(HomeRoute);
  }

  login() {
    const values = this.loginForm.value;
    this.error = undefined;
    this.reCaptchaService.execute(environment.reCAPTCHA, 'CRM',
      token => {
        this.userService.login(values.email, values.pass, token).subscribe({
          next: res => {
            this.sessionManager.login(res);
            this.analytics.userLogin(res.user);
            this.router.navigateByUrl(HomeRoute);
          },
          error: err => this.error = err?.error?.code,
        });
      }
    );
  }
}