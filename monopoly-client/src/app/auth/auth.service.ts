import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Account } from './account';
import { environment as env } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  players: Account[] = [];

  private account?: Account;

  constructor(private http: HttpClient) {

  }

  getLoggedAccount() {
    if (this.account) {
      return this.account;
    }
    throw Error('User is not logged in');
  }

  getOtherPlayers(except: Account) {
    return this.getPlayers(except.gameId).pipe(
      map(accounts => accounts.filter(a => a.id !== except.id))
    );
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${env.apiURL}/join/`, data).pipe(
      tap(a => this.login(a)),
      mergeMap(a => this.loadPlayers(a)),
      switchMap(() => EMPTY)
    );
  }

  private login(account: Account) {
    this.account = account;
  }

  private getPlayers(gameId: number) {
    const url = `${env.apiURL}/game`;
    return this.http.get<Account[]>(`${url}/${gameId}/players/`);
  }

  private loadPlayers(account: Account) {
    if (account.isBanker) {
      return this.getPlayers(account.gameId).pipe(
        tap(players => this.players = players)
      );
    }
    return EMPTY;
  }
}
