import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { BankService } from './bank.service';
import { Account } from '../auth/account';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.scss'],
})
export class BankerComponent implements OnInit {
  player: Account;
  bank?: Account;

  constructor(
    private bankService: BankService,
    private auth: AuthService) {

    this.player = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.bankService.getBankAccount(this.player.gameId).subscribe(
      bank => this.bank = bank
    );
  }
}
