import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Account } from 'src/app/auth/account';
import { PlayerService } from '../player.service';

interface TransactionForm {
  amount: string;
  recipientId: string;
}

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
})
export class TransferMoneyComponent implements OnInit {
  txForm: FormGroup;
  recipients: Account[] = [];

  @Output()
  done = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private player: PlayerService) {

    this.txForm = this.fb.group({
      amount: ['', Validators.required],
      recipientId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.player.getOtherPlayers().subscribe(a => this.recipients = a);
  }

  makeTransaction() {
    const form = this.txForm.value as TransactionForm;
    const recipient = this.recipients.find(a => a.id === +form.recipientId);

    if (recipient) {
      this.player.transfer(+form.amount, recipient).subscribe(() =>
        this.done.emit()
      );
    }
  }
}
