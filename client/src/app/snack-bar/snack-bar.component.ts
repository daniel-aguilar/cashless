import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Account } from 'src/app/auth/account';

export enum Message {
  TransactionMade,
  InsufficientFunds,
  PlayerAdded,
}

/**
 * HACK: I don't like the current implementation of i18n outside of templates
 * (lack of official tooling, documentation), so I'm stuck with this for now.
 */
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {

  get body() {
    return this.data.body;
  }

  get recipient() {
    return this.data.body.recipient as Account;
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }
}
