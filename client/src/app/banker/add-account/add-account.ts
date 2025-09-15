import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Account } from 'src/app/auth/account';
import { Game } from 'src/app/game';
import { uniqueName } from './unique-name';

export interface DialogData {
  gameId: number;
  existingAccounts: Account[];
}

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.html',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AddAccount {
  accountName;

  private data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<AddAccount>>(MatDialogRef);
  private game = inject(Game);

  constructor() {
    this.accountName = new FormControl('', [
      Validators.required,
      uniqueName(this.data.existingAccounts.map(a => a.name)),
    ]);
  }

  addAccount() {
    this.game.addAccount(this.accountName.value, this.data.gameId).subscribe(a =>
      this.dialogRef.close(a));
  }
}
