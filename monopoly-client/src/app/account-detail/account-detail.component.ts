import { Component, OnInit } from '@angular/core';

import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
})
export class AccountDetailComponent implements OnInit {
  name = '';
  balance = 0;

  constructor(private account: AccountService) {

  }

  ngOnInit() {
    this.name = this.account.name;
    this.account.getBalance().subscribe(n => this.balance = n);
  }
}
