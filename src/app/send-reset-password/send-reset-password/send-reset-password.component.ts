import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/services/Users/users.service';

@Component({
  selector: 'app-send-reset-password',
  templateUrl: 'send-reset-password.component.html',
  styleUrls: ['send-reset-password.component.sass']
})
export class SendResetPasswordComponent {
  constructor(private userService: UserService,
    private reCaptchaService: ReCaptchaV3Service) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  result?: string;

  resetPassword() {
    const email = this.form.value.email;
    if (!email) return;
    this.reCaptchaService.execute(environment.reCAPTCHA, 'sendResetPassword',
      token => {
        this.userService.sendReset(token, email).subscribe({
          next: () => this.result = 'ok',
          error: () => this.result = 'error',
        });
      }
    );
  }
}
