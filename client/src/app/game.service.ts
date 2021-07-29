import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment as env } from '../environments/environment';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

const apiURL = `${env.apiURL}/game`;

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) {

  }

  newGame(bankerName: string) {
    const data = new FormData();
    data.set('bankerName', bankerName);

    return this.http.post<Account>(`${apiURL}/new/`, data);
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${apiURL}/join/`, data).pipe(
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

  getOtherPlayersExcept(player: Account, skipBank = false) {
    const gameId = player.gameId;

    return this.getPlayers(gameId).pipe(
      map(accounts => {
        if (skipBank) {
          return accounts.filter(a => !a.isBank);
        }
        return accounts;
      }),
      map(accounts => accounts.filter(a => a.id !== player.id))
    );
  }

  private getPlayers(gameId: number) {
    return this.http.get<Account[]>(`${apiURL}/${gameId}/players/`);
  }
}
