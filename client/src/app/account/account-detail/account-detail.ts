import { CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit, inject, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Account } from 'src/app/auth/account';
import { Bank } from 'src/app/banker/bank';
import { CurrentAccount } from '../current-account';
import { PaymentLog } from '../payment-log/payment-log';
import { TransferMoney } from '../transfer-money/transfer-money';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.html',
  imports: [
    CurrencyPipe,
    MatDivider,
    TransferMoney,
    PaymentLog,
  ],
  providers: [CurrentAccount],
})
export class AccountDetail implements OnInit, OnChanges {
  updatingBalance = true;
  balance = 0;

  readonly account = input<Account>();

  private currentAccount = inject(CurrentAccount);
  private bank = inject(Bank);

  get player() {
    return this.currentAccount.instance;
  }

  ngOnInit() {
    this.updateBalance();
  }

  ngOnChanges() {
    this.currentAccount.instance = this.account();
  }

  updateBalance() {
    this.bank.getBalance(this.player).subscribe(n => {
      this.balance = n;
      this.updatingBalance = false;
    });
  }
}
