import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from 'src/app/banker/bank.service';
import { Transaction } from 'src/app/banker/transaction';
import { LoadingService } from 'src/app/loading/loading.service';
import { LocalizeNamePipe } from '../localize-name.pipe';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  imports: [
    DatePipe,
    LocalizeNamePipe,
  ],
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];

  private gameId = 0;
  private txSub: Subscription;
  private auth = inject(AuthService);
  private bank = inject(BankService);
  private loading = inject(LoadingService);

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
