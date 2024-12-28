import { CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit, inject, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PaymentLogComponent } from '../payment-log/payment-log.component';
import { PlayerService } from '../player.service';
import { TransferMoneyComponent } from '../transfer-money/transfer-money.component';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [
    CurrencyPipe,
    MatDivider,
    TransferMoneyComponent,
    PaymentLogComponent,
  ],
  providers: [PlayerService],
})
export class PlayerDetailComponent implements OnInit, OnChanges {
  player: Account;
  updatingBalance = true;
  balance = 0;

  readonly account = input<Account>();

  private currentPlayer = inject(PlayerService);
  private bank = inject(BankService);

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
