import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BankService } from '../shared/bank.service';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
})
export class CreateBankComponent {

  bankForm: FormGroup;

  constructor(private fb: FormBuilder, private bs: BankService) {
    this.bankForm = fb.group({
      name: '',
    });
  }

  createBank() {
    let name = this.bankForm.value.name;
    this.bs.createBank(name).subscribe(() => console.log('done'));
  }
}
