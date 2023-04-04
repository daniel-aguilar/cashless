import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Account } from '../auth/account';
import { AuthService } from '../auth/auth.service';
import { BankService } from './bank.service';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.scss'],
})
export class BankerComponent implements OnInit {
  player: Account;
  bank: Account;
  isHandset = false;

  constructor(
    private bankService: BankService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver) {

    this.player = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.bankService.getBankAccount(this.player.gameId).subscribe(
      bank => this.bank = bank
    );
    this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(res => this.isHandset = res.matches);
  }
}
