import { Component, OnInit } from '@angular/core';

import { Account } from '../shared/account';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
})
export class AccountHomeComponent implements OnInit {
  balance = 0;

  constructor(private as: AccountService) {

  }

  ngOnInit() {
    this.as.getBalance().subscribe(balance => this.balance = balance);
  }
}
