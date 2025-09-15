import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Auth } from 'src/app/auth/auth';
import { Bank } from 'src/app/banker/bank';
import { Transaction } from 'src/app/banker/transaction';
import { Loading } from 'src/app/loading-spinner/loading';
import { LocalizeNamePipe } from '../localize-name-pipe';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.html',
  imports: [
    DatePipe,
    LocalizeNamePipe,
  ],
})
export class TransactionLog implements OnInit, OnDestroy {
  transactions: Transaction[] = [];

  private gameId = 0;
  private txSub: Subscription;
  private auth = inject(Auth);
  private bank = inject(Bank);
  private loading = inject(Loading);

  ngOnInit() {
    this.gameId = this.auth.getLoggedAccount().gameId;
    this.loading.show();
    this.bank.getTransactionLog(this.gameId).subscribe(txs => {
      this.transactions = txs;
      this.listenToTransactions();
      this.loading.hide();
    });
  }

  ngOnDestroy() {
    this.txSub.unsubscribe();
  }

  private listenToTransactions() {
    this.txSub = this.bank.transactions.pipe(
      filter(tx => this.isFromThisGame(tx))
    ).subscribe(tx => this.transactions.unshift(tx));
  }

  private isFromThisGame(tx: Transaction) {
    const sameGame = tx.sender.gameId === tx.recipient.gameId;
    const thisGame = tx.sender.gameId === this.gameId;
    return sameGame && thisGame;
  }
}
