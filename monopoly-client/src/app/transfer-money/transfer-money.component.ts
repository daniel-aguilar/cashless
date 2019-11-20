import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Account } from '../shared/account';
import { FormControl } from '@angular/forms';
import { BankService } from '../shared/bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent implements OnInit {
  accounts: Account[] = [];
  toAccount = new FormControl('');
  amount = new FormControl('');

  private myId: number;

  constructor(
    private as: AccountService,
    private bs: BankService,
    private router: Router) {

    this.myId = as.loggedAccount.id;
  }

  ngOnInit() {
    this.as.getAccounts().subscribe(accounts => {
      // Don't transfer money to your own account
      this.accounts = accounts.filter(a => a.id !== this.myId);
    });
  }

  transferAmount() {
    this.bs.transfer(this.myId, this.toAccount.value, this.amount.value).subscribe(() => {
      console.log('done');
      this.router.navigate(['/account']);
    });
  }
}
