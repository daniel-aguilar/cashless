import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment as env } from '../environments/environment';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';
import { BankService } from './banker/bank.service';

const apiURL = `${env.apiURL}/game`;

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private bank: BankService) {

  }

  newGame(bankerName: string) {
    return this.http.post<Account>(`${env.apiURL}/new/`, bankerName);
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${env.apiURL}/join/`, data).pipe(
      tap(a => this.auth.login(a)),
      switchMap(() => EMPTY)
    );
  }

  addPlayer(name: string, gameId: number) {
    const url = `${apiURL}/${gameId}/players/add/`;
    const data = new FormData();
    data.set('playerName', name);

    return this.http.post<Account>(url, data);
  }

  getOtherPlayers(except: Account, skipBank = false) {
    const gameId = except.gameId;

    return this.getPlayers(gameId).pipe(
      switchMap(accounts => {
        if (skipBank) {
          return this.bank.getBankAccount(gameId).pipe(
            map(bank => accounts.filter(a => a.id !== bank.id))
          );
        }
        return of(accounts);
      }),
      map(accounts => accounts.filter(a => a.id !== except.id))
    );
  }

  private getPlayers(gameId: number) {
    return this.http.get<Account[]>(`${apiURL}/${gameId}/players/`);
  }
}
