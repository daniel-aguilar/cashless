import { Component, OnInit } from '@angular/core';

import { BankService } from 'src/app/banker/bank.service';
import { PlayerService } from '../player.service';
import { Payment } from 'src/app/banker/payment';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit {
  emptyLines = new Array(4);
  payments: Payment[] = [];

  private get player() {
    return this.currentPlayer.account;
  }

  constructor(
    private currentPlayer: PlayerService,
    private bank: BankService) {

  }

  ngOnInit() {
    this.bank.getPayments(this.player).subscribe(
      p => this.addToLog(p)
    );
  }

  addToLog(p: Payment) {
    this.payments.unshift(p);

    if (this.payments.length > 3) {
      this.payments.pop();
    }
  }
}
