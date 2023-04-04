import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { HomeRoute } from 'src/types/routes';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
    protected reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router) { }

  form = new FormGroup({
    email: new FormControl(''),
    mailing: new FormControl(false)
  });

  ngOnInit() {
    const user = this.sessionManager.getUser();
    if (user) this.router.navigateByUrl(HomeRoute);
  }
  
  goToRegister() {
    const { mailing, email } = this.form.value;
    this.router.navigate(['register'], { queryParams: { email, mailing } });
  }
}