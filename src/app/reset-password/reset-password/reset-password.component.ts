import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/services/Users/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.sass']
})
export class ResetPasswordComponent {
  constructor(
    private userService: UserService,
    private reCaptchaService: ReCaptchaV3Service,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const resetToken = params.get('resetToken');
      if (!resetToken) return;
      this.form.patchValue({ resetToken });
    });
  }

  form = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordRepeated: new FormControl('', Validators.required),
    resetToken: new FormControl('', Validators.required),
  });

  result?: string;

  resetPassword() {
    const { password, passwordRepeated, resetToken } = this.form.value;
    if (!password || !passwordRepeated || !resetToken || password !== passwordRepeated) return;
    this.reCaptchaService.execute(environment.reCAPTCHA, 'resetPassword',
      token => {
        this.userService.reset(token, resetToken, password).subscribe({
          next: () => this.result = 'ok',
          error: () => this.result = 'error',
        });
      }
    );
  }
}
