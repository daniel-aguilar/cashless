import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from './account';
import { AccountService } from './account.service';

const apiURL = environment.apiURL;
const gameURL = `${apiURL}/game`

interface JoinResponse {
  gameId: number;
  account: Account;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameId = 0;

  constructor(
    private http: HttpClient,
    private auth: AccountService) {

  }

  join(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<JoinResponse>(`${apiURL}/join/`, data).pipe(
      tap(res => this.setUp(res)),
      switchMap(() => EMPTY)
    );
  }

  getPlayers() {
    const emptyList: Account[] = [];

    return this.http.get<Account[]>(`${gameURL}/${this.gameId}/players/`).pipe(
      catchError(() => of(emptyList))
    );
  }

  private setUp(res: JoinResponse) {
    this.gameId = res.gameId;
    this.auth.login(res.account);
  }
}
