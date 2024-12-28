import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  FormControl, FormGroup,
  FormGroupDirective, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { GameService } from 'src/app/game.service';
import { PlayerService } from '../player.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarModule } from 'src/app/snackbar.module';
import { LocalizeNamePipe } from '../localize-name.pipe';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
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
export class TransferMoneyComponent implements OnInit {
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
  private currentPlayer = inject(PlayerService);
  private game = inject(GameService);
  private bank = inject(BankService);

  private get player() {
    return this.currentPlayer.account;
  }

  ngOnInit() {
    this.game.getOtherPlayersExcept(this.player)
        .subscribe(players => this.recipients = players);
  }

  makeTransaction() {
    const data = this.form.value;
    const recipient = this.recipients.find(a => a.id === +data.recipientId);

    this.isLoading = true;
    this.bank.makeTransaction(this.player, data.amount, recipient)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => this.success(data.amount, recipient),
          error: () => this.snack.open($localize `Non-Sufficient Funds`, '',
          { panelClass: 'snack-error' })
        });
  }

  private success(amount: number, recipient: Account) {
    const bankName = $localize `Bank`;
    const recipientName = recipient.isBank ? bankName : recipient.name;

    this.fg().resetForm({ recipientId: '' });
    this.snack.open($localize `Transfered $${amount} to ${recipientName}`);
  }
}
