import { CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit, inject, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Account } from 'src/app/auth/account';
import { Bank } from 'src/app/banker/bank';
import { PaymentLog } from '../payment-log/payment-log';
import { Player } from '../player';
import { TransferMoney } from '../transfer-money/transfer-money';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.html',
  imports: [
    CurrencyPipe,
    MatDivider,
    TransferMoney,
    PaymentLog,
  ],
  providers: [Player],
})
export class PlayerDetail implements OnInit, OnChanges {
  player: Account;
  updatingBalance = true;
  balance = 0;

  readonly account = input<Account>();

  private currentPlayer = inject(Player);
  private bank = inject(Bank);

  constructor() {
    this.player = this.currentPlayer.account;
  }

  ngOnInit() {
    this.updateBalance();
  }

  ngOnChanges() {
    this.player = this.currentPlayer.account = this.account();
  }

  updateBalance() {
    this.bank.getBalance(this.player).subscribe(n => {
      this.balance = n;
      this.updatingBalance = false;
    });
  }
}
