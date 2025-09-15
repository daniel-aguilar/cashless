import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  FormControl, FormGroup,
  FormGroupDirective, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Account } from 'src/app/auth/account';
import { Bank } from 'src/app/banker/bank';
import { Game } from 'src/app/game';
import { CurrentAccount } from '../current-account';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarModule } from 'src/app/snackbar-module';
import { LocalizeNamePipe } from '../localize-name-pipe';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    LocalizeNamePipe,
    SnackBarModule,
  ],
})
export class TransferMoney implements OnInit {
  form = new FormGroup({
    amount: new FormControl<number>(null, { validators: [
      Validators.required,
      Validators.min(1),
    ]}), // eslint-disable-line @stylistic/ts/object-curly-spacing
    recipientId: new FormControl('', { validators: Validators.required }),
  });

  recipients: Account[] = [];
  isLoading = false;

  readonly fg = viewChild(FormGroupDirective);

  private snack = inject(MatSnackBar);
  private currentAccount = inject(CurrentAccount);
  private game = inject(Game);
  private bank = inject(Bank);

  private get account() {
    return this.currentAccount.instance;
  }

  ngOnInit() {
    this.game.getOtherAccountsExcept(this.account)
        .subscribe(accounts => this.recipients = accounts);
  }

  makeTransaction() {
    const data = this.form.value;
    const recipient = this.recipients.find(a => a.id === +data.recipientId);

    this.isLoading = true;
    this.bank.makeTransaction(this.account, data.amount, recipient)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => this.success(data.amount, recipient),
          error: () => this.snack.open($localize `Non-Sufficient Funds`)
        });
  }

  private success(amount: number, recipient: Account) {
    const bankName = $localize `Bank`;
    const recipientName = recipient.isBank ? bankName : recipient.name;

    this.fg().resetForm({ recipientId: '' });
    this.snack.open($localize `Transfered $${amount} to ${recipientName}`);
  }
}
