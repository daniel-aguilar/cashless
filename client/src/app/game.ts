import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment as env } from '../environments/environment';
import { Account } from './auth/account';
import { Auth } from './auth/auth';

const apiURL = `${env.apiURL}/game`;

@Injectable({ providedIn: 'root' })
export class Game {

  private http = inject(HttpClient);
  private auth = inject(Auth);

  newGame(bankerName: string) {
    const data = new FormData();
    data.set('bankerName', bankerName);

    return this.http.post<Account>(`${apiURL}/new`, data);
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${apiURL}/join`, data).pipe(
      tap(a => this.auth.login(a)),
      switchMap(() => EMPTY)
    );
  }

  addAccount(name: string, gameId: number) {
    const url = `${apiURL}/${gameId}/accounts/add`;
    const data = new FormData();
    data.set('accountName', name);

    return this.http.post<Account>(url, data);
  }

  getOtherAccountsExcept(account: Account, skipBank = false) {
    const gameId = account.gameId;

    return this.getAccounts(gameId).pipe(
      map(accounts => {
        if (skipBank) {
          return accounts.filter(a => !a.isBank);
        }
        return accounts;
      }),
      map(accounts => accounts.filter(a => a.id !== account.id))
    );
  }

  private getAccounts(gameId: number) {
    return this.http.get<Account[]>(`${apiURL}/${gameId}/accounts`);
  }
}
