import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from 'src/app/banker/bank.service';
import { Transaction } from 'src/app/banker/transaction';
import { LoadingService } from 'src/app/loading/loading.service';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];

  private gameId = 0;
  private txSub: Subscription;

  constructor(
    private auth: AuthService,
    private bank: BankService,
    private loading: LoadingService) {

  }

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
