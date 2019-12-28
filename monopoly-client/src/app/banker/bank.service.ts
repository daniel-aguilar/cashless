import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { Account } from 'src/app/auth/account';

const apiURL = `${env.apiURL}/account`;

@Injectable({ providedIn: 'root' })
export class BankService {

  constructor(private http: HttpClient) {

  }

  getBalance(account: Account) {
    return this.http.get<number>(`${apiURL}/${account.id}/balance/`);
  }

  getOtherPlayers(except: Account) {
    const url = `${env.apiURL}/game`;

    return this.http.get<Account[]>(`${url}/${except.gameId}/players/`).pipe(
      map(accounts => accounts.filter(a => a.id !== except.id))
    );
  }

  makeTransaction(sender: Account, amount: number, recipient: Account) {
    return this.http.post<never>(`${apiURL}/${sender.id}/transfer/`,
      { amount, to: recipient.id });
  }

  getBankAccount(gameId: number) {
    const url = `${env.apiURL}/game/${gameId}/bank/`;
    return this.http.get<Account>(`${url}`);
  }
}
