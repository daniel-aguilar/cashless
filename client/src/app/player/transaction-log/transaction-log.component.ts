import { Component, OnDestroy, OnInit } from '@angular/core';
import reverse from 'lodash-es/reverse';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from 'src/app/banker/bank.service';
import { Transaction } from 'src/app/banker/transaction';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit, OnDestroy {

  get transactions() {
    return reverse(this.txs);
  }

  private txs: Transaction[] = [];
  private txSub: Subscription;

  private get player() {
    return this.auth.getLoggedAccount();
  }

  constructor(
    private auth: AuthService,
    private bank: BankService) {

  }

  ngOnInit() {
    const gameId = this.player.gameId;
    this.bank.getTransactionLog(gameId).subscribe(txs => {
      this.txs = txs;
      this.listenToTransactions();
    });
  }

  ngOnDestroy() {
    this.txSub.unsubscribe();
  }

  private listenToTransactions() {
    this.txSub = this.bank.transactions.subscribe(tx => this.txs.push(tx));
  }
}
