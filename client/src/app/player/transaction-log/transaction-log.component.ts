import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { PlayerService } from '../player.service';
import { Subscription } from 'rxjs';

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
    this.subPayments = this.bank.getPayments(this.player).subscribe(
      p => this.addToLog(p)
    );
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
