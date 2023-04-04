import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private sessionManager: SessionManagerService,
  ) { }

  user?: User = this.sessionManager.getUser();

  ngOnInit() {
    this.sessionManager.checkSession();
    this.sessionManager.userSession.subscribe(res => this.onLogin(res));
    if (this.user) this.onLogin(this.user);
  }

  onLogin(user?: User) {
    this.user = user;
  }
}