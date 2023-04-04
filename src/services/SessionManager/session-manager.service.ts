import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from 'src/models/teams/team';
import { Login, User } from 'src/models/user';

export type StoreKeys = 'user' | 'token' | 'selectedTeam' | 'extendedLateralMenu';

@Injectable({ providedIn: 'root' })
export class SessionManagerService {

  constructor() {
    const user = this.retrieve<User>('user');
    if (user) this.userSession.next(user);
  }

  static user?: User;
  public userSession: Subject<User | undefined> = new Subject<User | undefined>();
  defaultHeaders?: { headers: HttpHeaders };

  static selectedTeam?: Team;
  static selectedTeamObserver: Subject<Team> = new Subject<Team>();

  static topMenuHeight = 0;
  static topMenuHeightObserver: Subject<number> = new Subject<number>();

  getTeam(): Team {
    return SessionManagerService.selectedTeam ?? this.retrieve<Team>('selectedTeam')!;
  }

  setTeam(team: Team, update: boolean = false) {
    if (team) this.store('selectedTeam', team);
    else this.clear('selectedTeam');

    // Avoid to send the same team
    if (team && SessionManagerService.selectedTeam?.id === team.id && update === false) return;
    SessionManagerService.selectedTeam = team;
    SessionManagerService.selectedTeamObserver.next(team);
  }

  static setTopMenuHeight(height: number) {
    SessionManagerService.topMenuHeight = height;
    SessionManagerService.topMenuHeightObserver.next(height);
  }

  clear(key: StoreKeys) {
    localStorage.removeItem(key);
  }

  store(key: StoreKeys, data: Object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  retrieveRaw(key: StoreKeys): string | null {
    return localStorage.getItem(key);
  }

  retrieve<T>(key: StoreKeys): T | undefined {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : undefined;
  }

  private getOptions(): { headers: HttpHeaders } {
    if (!this.defaultHeaders) {
      let headers = new HttpHeaders();
      this.defaultHeaders = { headers };
    }
    return this.defaultHeaders;
  }

  getToken(): string | null {
    const token = this.retrieveRaw('token');
    if (!token) return null;
    return token.replaceAll('"', '');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    try {
      const data = JSON.parse(atob(parts[1]))
      if (data.exp && new Date().valueOf() / 1000 < data.exp) {
        return true;
      }
    } catch { }
    return false;
  }

  /*
  getLocale(): string {
    let locale = localStorage.getItem('locale');
    if(!locale) {
      locale = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang;
      localStorage.setItem('locale', locale);
    }
    return locale;
  }

  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
  }
  */

  checkSession() {
    if (!this.isAuthenticated()) this.logOut();
  }

  getUser(): User | undefined {
    return this.retrieve<User>('user');
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSession.next(user);
    SessionManagerService.user = user;
  }

  login(login: Login) {
    this.storeUser(login.user);
    this.store('token', login.token.replace('"', ''));
    this.defaultHeaders = undefined;
    this.getOptions();
  }

  getTeamUser(userId: string): User | undefined {
    const member = this.getTeam().members?.filter(member => userId === member.user.id);
    return member === undefined ? undefined : member[0].user;
  }

  getTeamUsers(userIds: string[]): User[] {
    const users: User[] = [];
    const teamUser = this.getTeam().users?.filter(user => userIds.includes(user.id));
    if (teamUser) users.push(...teamUser);
    return users;
  }

  logOut() {
    localStorage.clear();
    this.defaultHeaders = undefined;
    this.userSession.next(undefined);
    SessionManagerService.user = undefined;
  }
}