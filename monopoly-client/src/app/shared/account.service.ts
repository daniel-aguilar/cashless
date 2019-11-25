import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Account } from './account';

const apiURL = `${environment.apiURL}/account`;

@Injectable({
  providedIn: 'root'
})
export class AccountService implements CanActivate {
  private isLoggedIn = false;
  private account: Account = {
    id: 0,
    name: '',
    isBanker: false,
  };

  get info() {
    return this.account;
  }

  constructor(private http: HttpClient) {

  }

  canActivate() {
    return this.isLoggedIn;
  }

  login(account: Account) {
    this.isLoggedIn = true;
    this.account = account;
  }

  getBalance() {
    return this.http.get<number>(`${apiURL}/${this.account.id}/balance/`).pipe(
      catchError(() => of(0))
    );
  }

  transfer(amount: number, recipient: Account) {
    return this.http.post(`${apiURL}/${this.account.id}/transfer/`, { amount, to: recipient.id });
  }
}
