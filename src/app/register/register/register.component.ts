import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { TeamService } from 'src/services/Team/team.service';
import { UserService } from 'src/services/Users/users.service';
import { HomeRoute } from 'src/types/routes';
import { Id } from 'src/VOs/Id';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(
    protected teamService: TeamService,
    protected reCaptchaV3Service: ReCaptchaV3Service,
    private userService: UserService,
    private sessionManager: SessionManagerService,
    private analitycsService: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }



  ngOnInit() {
    const user = this.sessionManager.getUser();
    if (user) this.router.navigateByUrl(HomeRoute);
    this.route.queryParams.subscribe(params => {
      const { mailing, email } = params;
      if (email) {
        this.form.patchValue({ email });
      }
      this.showEmail = email === undefined;
      this.showMailing = mailing === undefined;
      if (mailing !== undefined) {
        this.form.patchValue({ mailing });
      }
    });
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    passCheck: new FormControl('', Validators.required),
    mailing: new FormControl(true)
  });

  showEmail: boolean = false;
  showMailing: boolean = false;
  passError = '';

  register() {
    const { pass, passCheck } = this.form.value;

    if (pass !== passCheck) this.passError = 'Not Equals';
    else this.passError = '';

    this.reCaptchaV3Service.execute(environment.reCAPTCHA, 'UserRegister', token => {
      const model = this.form.value;
      model.id = Id.generate().value;

      // TODO get user navegator locale
      model.locale = this.translate.getBrowserLang();
      this.userService.register({ token, model }).subscribe(res => {
        this.sessionManager.login(res);
        this.analitycsService.userRegistered(res.user);
        const teamInvitationId = localStorage.getItem('teamInvitationId');
        const teamInvitationToken = localStorage.getItem('teamInvitationToken');
        if (teamInvitationId && teamInvitationToken) {
          this.teamService.acceptInvite(new Id(teamInvitationId), new Id(teamInvitationToken)).subscribe(() => {
            this.teamService.updateTeams();
            // TODO translate
            const translation = this.translate.instant('register.joinedTeam')
            this.snackBar.open(translation, 'OK', { duration: 2000, });
            localStorage.removeItem('teamInvitationId');
            localStorage.removeItem('teamInvitationToken');
            this.router.navigate(['/project']);
          });
        }
        else this.router.navigate(['/project']);
      });
    });
  }
}