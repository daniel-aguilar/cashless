import { Component, OnInit } from '@angular/core';

import { Account } from '../shared/account';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(private as: AccountService) { }

  ngOnInit() {
    this.account = this.as.account;
  }

}
