import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GameService } from '../shared/game.service';
import { AccountService } from '../shared/account.service';
import { Account } from '../shared/account';

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
  accounts: Account[] = [];

  @Output()
  done = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private game: GameService,
    private account: AccountService) {

    this.txForm = this.fb.group({
      amount: ['', Validators.required],
      recipientId: ['', Validators.required],
    });
  }

  ngOnInit() {
    const accountId = this.account.info.id;

    this.game.getPlayers().subscribe(players =>
      // Don't transfer money to yourself
      this.accounts = players.filter(p => p.id !== accountId)
    );
  }

  makeTransaction() {
    const form = this.txForm.value as TransactionForm;
    const account = this.accounts.find(a => a.id === +form.recipientId);

    if (account) {
      this.account.transfer(+form.amount, account).subscribe(() =>
        this.done.emit()
      );
    }
  }
}
