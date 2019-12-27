import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Account } from './account';
import { environment as env } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private account?: Account;

  constructor(private http: HttpClient) {

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
