import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl, FormGroup,
  FormGroupDirective, Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { GameService } from 'src/app/game.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent implements OnInit {
  form = new FormGroup({
    amount: new FormControl<number>(null, { validators: [
      Validators.required,
      Validators.min(1),
    ]}), // eslint-disable-line object-curly-spacing
    recipientId: new FormControl('', { validators: Validators.required }),
  });

  recipients: Account[] = [];
  isLoading = false;

  @ViewChild(FormGroupDirective)
  fg: FormGroupDirective;

  private get player() {
    return this.currentPlayer.account;
  }

  constructor(
    private snack: MatSnackBar,
    private currentPlayer: PlayerService,
    private game: GameService,
    private bank: BankService) {

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
        .subscribe(
          () => this.success(data.amount, recipient),
          () => this.snack.open($localize `Non-Sufficient Funds`, '',
              { panelClass: 'snack-error' })
        );
  }

  private success(amount: number, recipient: Account) {
    const bankName = $localize `Bank`;
    const recipientName = recipient.isBank ? bankName : recipient.name;

    this.fg.resetForm({ recipientId: '' });
    this.snack.open($localize `Transfered $${amount} to ${recipientName}`);
  }
}
