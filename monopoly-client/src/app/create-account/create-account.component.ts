import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Bank } from '../shared/bank';
import { AccountService } from '../shared/account.service';
import { BankService } from '../shared/bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {

  joinForm: FormGroup;
  banks: Bank[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BankService,
    private as: AccountService) {
    
    this.joinForm = fb.group({
      bank: '',
      account: '',
    });
  }

  ngOnInit() {
    this.bs.getBanks().subscribe(banks => {
      this.banks = banks
    });
  }

  createAccount() {
    let data = this.joinForm.value;
    const bank = this.banks.find(b => b.id == data.bank);

    if (bank) {
      this.as.createAccount(bank, data.account).subscribe(() => {
        this.router.navigate(['/account']);
      });
    }
  }
}
