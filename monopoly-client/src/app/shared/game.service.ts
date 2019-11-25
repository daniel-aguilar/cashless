import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from './account';

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

  constructor(private http: HttpClient) {

  }

  join(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<JoinResponse>(`${apiURL}/join/`, data).pipe(
      tap(res => this.gameId = res.gameId),
      map(res => res.account)
    );
  }

  getPlayers() {
    const emptyList: Account[] = [];

    return this.http.get<Account[]>(`${gameURL}/${this.gameId}/players/`).pipe(
      catchError(() => of(emptyList))
    );
  }
}
