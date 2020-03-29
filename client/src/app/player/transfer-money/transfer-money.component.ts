import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { GameService } from 'src/app/game.service';
import { Message, SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent implements OnInit {
  form: FormGroup;
  recipients: Account[] = [];

  @ViewChild(FormGroupDirective)
  fg: FormGroupDirective;

  private get player() {
    return this.currentPlayer.account;
  }

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private currentPlayer: PlayerService,
    private game: GameService,
    private bank: BankService) {

    this.form = this.fb.group({
      amount: ['', [
        Validators.required,
        Validators.min(1),
      ]],
      recipientId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.game.getOtherPlayers(this.player).subscribe(a => this.recipients = a);
  }

  makeTransaction() {
    const data = this.form.value;
    const recipient = this.recipients.find(a => a.id === +data.recipientId);

    this.bank.makeTransaction(this.player, +data.amount, recipient).subscribe(
      () => this.success(+data.amount, recipient.name),
      () => this.snack.openFromComponent(SnackBarComponent, {
        data: { message: Message.InsufficientFunds },
        panelClass: 'snack-error',
      })
    );
  }

  private success(amount: number, name: string) {
    this.fg.resetForm({ recipientId: '' });
    this.snack.openFromComponent(SnackBarComponent, {
      data: {
        message: Message.TransactionMade,
        body: { amount, name }
      }
    });
  }
}
