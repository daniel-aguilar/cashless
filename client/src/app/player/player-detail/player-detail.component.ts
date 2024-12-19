import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PaymentLogComponent } from '../payment-log/payment-log.component';
import { PlayerService } from '../player.service';
import { TransferMoneyComponent } from '../transfer-money/transfer-money.component';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  imports: [
    CurrencyPipe,
    MatDivider,
    TransferMoneyComponent,
    PaymentLogComponent,
  ],
  providers: [PlayerService],
})
export class PlayerDetailComponent implements OnInit {
  player: Account;
  updatingBalance = true;
  balance = 0;

  @Input()
  set account(account: Account) {
    this.player = this.currentPlayer.account = account;
  }

  constructor(
    private currentPlayer: PlayerService,
    private bank: BankService) {

    this.player = this.currentPlayer.account;
  }

  ngOnInit() {
    this.updateBalance();
  }

  updateBalance() {
    this.bank.getBalance(this.player).subscribe(n => {
      this.balance = n;
      this.updatingBalance = false;
    });
  }
}
