import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionManagerService } from "src/services/SessionManager/session-manager.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private sessionManager: SessionManagerService,
    private snackBar: MatSnackBar) { }

  readonly sessionErrCodes = [401, 403];
  readonly recaptchaMethods = ['PUT', 'POST', 'PATCH'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionManager.retrieveRaw('token')?.replaceAll('"', '');
    let headers = req.headers;
    if (token) {
      headers = headers.set("Authorization", token);
    }
    if (req.method === 'PATCH') {
      headers = headers.set('Content-Type', 'application/merge-patch+json')
    }
    if (!headers.get('Accept')) {
      headers = headers.set('Accept', 'application/json');
    }
    const newRequest = req.clone({ headers });

    return next.handle(newRequest).pipe(catchError(err => this.errorHandler(err)));
  }

  errorHandler(err: HttpErrorResponse) {
    if (this.sessionErrCodes.includes(err.status)) {
      this.sessionManager.logOut();
    } else if (err.error.detail) {
      //TODO change err path
      this.snackBar.open(err.error.detail, 'OK', { duration: 5000 });
    }
    return throwError(err);
  }
}