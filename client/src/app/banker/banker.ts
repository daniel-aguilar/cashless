import { Component, OnInit, inject } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { Account } from '../auth/account';
import { Auth } from '../auth/auth';
import { AccountDetail } from '../account/account-detail/account-detail';
import { Bank } from './bank';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.html',
  imports: [
    MatTabsModule,
    AccountDetail,
  ],
})
export class Banker implements OnInit {
  account: Account;
  bank: Account;
  isHandset = false;

  private bankService = inject(Bank);
  private auth = inject(Auth);
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.account = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.bankService.getBankAccount(this.account.gameId).subscribe(
      bank => this.bank = bank
    );
    this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(res => this.isHandset = res.matches);
  }
}
