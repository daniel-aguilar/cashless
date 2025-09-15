import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import orderBy from 'lodash-es/orderBy';
import { Account } from 'src/app/auth/account';
import { Auth } from 'src/app/auth/auth';
import { Game } from 'src/app/game';
import { AddAccount, DialogData } from '../add-account/add-account';
import { PinHider } from '../pin-hider';
import { SnackBarModule } from 'src/app/snackbar-module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.html',
  styleUrl: './account-list.css',
  imports: [
    PinHider,
    MatButtonModule,
    MatIconModule,
    SnackBarModule,
  ],
})
export class AccountList implements OnInit {
  banker: Account;
  accounts: Account[] = [];

  private auth = inject(Auth);
  private game = inject(Game);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  constructor() {
    this.banker = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.game.getOtherAccountsExcept(this.banker, true)
      .subscribe(accounts => this.accounts = accounts);
  }

  openDialog() {
    const data: DialogData = {
      gameId: this.banker.gameId,
      existingAccounts: this.accounts.concat(this.banker), // Don't leave the banker out
    };

    this.dialog.open(AddAccount, { data })
      .afterClosed().subscribe((account: Account) => {
        if (account) {
          this.push(account);
          this.snack.open($localize `Player ${account.name} added`);
        }
      });
  }

  private push(account: Account) {
    this.accounts.push(account);
    this.accounts = orderBy(this.accounts, ['name']);
  }
}
