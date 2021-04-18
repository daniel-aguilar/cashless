import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private txSub: Subscription;

  private get player() {
    return this.auth.getLoggedAccount();
  }

  constructor(
    private auth: AuthService,
    private bank: BankService,
    private loading: LoadingService) {

  }

  ngOnInit() {
    const gameId = this.player.gameId;
    this.loading.show();
    this.bank.getTransactionLog(gameId).subscribe(txs => {
      this.transactions = txs;
      this.listenToTransactions();
      this.loading.hide();
    });
  }

  ngOnDestroy() {
    this.txSub.unsubscribe();
  }

  private listenToTransactions() {
    this.txSub = this.bank.transactions.subscribe(tx => this.transactions.unshift(tx));
  }
}
