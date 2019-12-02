import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Account } from './account';
import { environment as env } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private account?: Account;

  constructor(
    private http: HttpClient,
    private router: Router) {

  }

  canActivate() {
    if (this.account !== undefined) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

  getLoggedAccount() {
    if (this.account) {
      return this.account;
    }
    throw Error('User is not logged in');
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${env.apiURL}/join/`, data).pipe(
      tap(a => this.login(a)),
      switchMap(() => EMPTY)
    );
  }

  private login(account: Account) {
    this.account = account;
  }
}
