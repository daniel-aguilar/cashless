import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { Account } from 'src/app/auth/account';
import { AuthService } from '../auth/auth.service';

const apiURL = `${env.apiURL}/account`;

@Injectable()
export class PlayerService {

  get name() {
    return this.player.name;
  }

  private get player() {
    return this.auth.getLoggedAccount();
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService) {

  }

  getBalance() {
    return this.http.get<number>(`${apiURL}/${this.player.id}/balance/`);
  }

  getOtherPlayers() {
    const url = `${env.apiURL}/game`;

    return this.http.get<Account[]>(`${url}/${this.player.gameId}/players/`).pipe(
      map(accounts => accounts.filter(a => a.id !== this.player.id))
    );
  }

  transfer(amount: number, recipient: Account) {
    return this.http.post<never>(`${apiURL}/${this.player.id}/transfer/`,
      { amount, to: recipient.id });
  }
}
