import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Account } from 'src/app/auth/account';
import { environment as env } from 'src/environments/environment';
import { Payment } from './payment';
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

  getPayments(account: Account) {
    return this.transactions.asObservable().pipe(
      filter(tx => {
        const isSender = tx.sender.id === account.id;
        const isRecipient = tx.recipient.id === account.id;

        return isSender || isRecipient;
      }),
      map(tx => new Payment(tx, account))
    );
  }

  makeTransaction(sender: Account, amount: number, recipient: Account) {
    return this.http.post<never>(`${apiURL}/${sender.id}/transfer/`,
      { amount, to: recipient.id });
  }

  getBankAccount(gameId: number) {
    const url = `${env.apiURL}/game/${gameId}/bank/`;
    return this.http.get<Account>(url);
  }

  getLastestPayments(account: Account) {
    const url = `${apiURL}/${account.id}/transactions/`;
    return this.http.get<Transaction[]>(url).pipe(
      map(list => list.map(tx => new Payment(tx, account)))
    );
  }

  private listenToTransactions() {
    let tx: Transaction;

    this.transactionWS.subscribe('/queue/transactions', (msg: Message) => {
      tx = JSON.parse(msg.body);
      this.transactions.next(tx);
    });
  }
}
