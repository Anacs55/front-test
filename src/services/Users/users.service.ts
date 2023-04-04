import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser, Login, User } from 'src/models/user';
import { BaseService } from 'src/services/base.service';
import { SessionManagerService } from '../SessionManager/session-manager.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(protected sessionManager: SessionManagerService,
    protected http: HttpClient) {
    super('/user');
  }

  login = (email: string, pass: string, token: string): Observable<Login> => this.http.post<Login>(`${this.baseUrl}/login`, { email, pass, token });
  register = (model: CreateUser): Observable<Login> => this.http.post<Login>(`${this.baseUrl}/register`, model);
  sendReset = (token: string, email: string): Observable<boolean> => this.http.post<boolean>(`${this.baseUrl}/sendReset`, { token, model: { email } });
  reset = (token: string, resetToken: string, password: string): Observable<boolean> => this.http.post<boolean>(`${this.baseUrl}/reset`, { token, model: { resetToken, password } });

  update = (user: User) => this.http.put<string>(this.baseUrl, { user });
  
  googleLogin = (token: string): Observable<Login> => this.http.post<Login>(`${this.baseUrl}/auth/login`, {
    provider: 'google',
    token,
  });

  googleRegister = (token: string): Observable<Login> => this.http.post<Login>(`${this.baseUrl}/auth/register`, {
    provider: 'google',
    token,
  });
}