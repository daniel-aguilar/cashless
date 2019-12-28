import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PlayerService } from '../player.service';

interface TransactionForm {
  amount: string;
  recipientId: string;
}

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent implements OnInit {
  txForm: FormGroup;
  recipients: Account[] = [];

  @Output()
  done = new EventEmitter();

  private get player() {
    return this.currentPlayer.account;
  }

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private currentPlayer: PlayerService,
    private bank: BankService) {

    this.txForm = this.fb.group({
      amount: ['', Validators.required],
      recipientId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.bank.getOtherPlayers(this.player).subscribe(a => this.recipients = a);
  }

  makeTransaction() {
    const form = this.txForm.value as TransactionForm;
    const recipient = this.recipients.find(a => a.id === +form.recipientId);

    if (recipient) {
      this.bank.makeTransaction(this.player, +form.amount, recipient).subscribe(() =>
        this.success(+form.amount, recipient.name));
    }
  }

  private success(amount: number, name: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: 'custom-snackbar',
    };

    this.done.emit();
    this.snack.open(`Transfered $${amount} to ${name}!`, 'Ok', config);
  }
}
