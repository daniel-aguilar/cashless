import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { Account } from 'src/app/auth/account';
import { Transaction } from './transaction';

const apiURL = `${env.apiURL}/account`;

@Injectable({ providedIn: 'root' })
export class BankService {
  private transactionWS: Client;
  private transactions = new Subject<Transaction>();

  constructor(private http: HttpClient) {
    this.transactionWS = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      onConnect: () => this.listenToTransactions(),
    });
    this.transactionWS.activate();
  }

  getBalance(account: Account) {
    return this.http.get<number>(`${apiURL}/${account.id}/balance/`);
  }

  getTransactionsTo(account: Account) {
    return this.transactions.asObservable().pipe(
      filter(tx => tx.recipient.id === account.id)
    );
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

  private listenToTransactions() {
    let tx: Transaction;

    this.transactionWS.subscribe('/queue/transactions', (msg: Message) => {
      tx = JSON.parse(msg.body);
      this.transactions.next(tx);
    });
  }
}
