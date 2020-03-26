import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  emptyLines = new Array(4);
  payments: Payment[] = [];

  private subPayments: Subscription;

  private get player() {
    return this.currentPlayer.account;
  }

  constructor(
    private currentPlayer: PlayerService,
    private bank: BankService) {

  }

  ngOnInit() {
    const lastest = this.bank.getLastestPayments(this.player);

    this.subPayments = lastest.pipe(
      switchMap(payments => {
        this.payments = payments;
        return this.bank.getPayments(this.player);
      })
    ).subscribe(p => this.addToLog(p));
  }

  ngOnDestroy() {
    this.subPayments.unsubscribe();
  }

  addToLog(p: Payment) {
    this.payments.unshift(p);

    if (this.payments.length > 3) {
      this.payments.pop();
    }
  }
}
