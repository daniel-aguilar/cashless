import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./transaction-log.component.scss'],
  imports: [
    CommonModule,
    LocalizeNamePipe
  ],
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  isHandset = false;

  private gameId = 0;
  private txSub: Subscription;

  constructor(
    private auth: AuthService,
    private bank: BankService,
    private loading: LoadingService,
    private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit() {
    this.gameId = this.auth.getLoggedAccount().gameId;
    this.loading.show();
    this.bank.getTransactionLog(this.gameId).subscribe(txs => {
      this.transactions = txs;
      this.listenToTransactions();
      this.loading.hide();
    });
    this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(res => this.isHandset = res.matches);
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
