import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { SessionManagerService } from "../SessionManager/session-manager.service";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private sessionManager: SessionManagerService,
        private router: Router) { }

    canLoad = () => {
        const authenticated = this.sessionManager.isAuthenticated();
        if (!authenticated) this.router.navigateByUrl('/login');
        return authenticated;
    }
}