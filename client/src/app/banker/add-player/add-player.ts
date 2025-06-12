import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/auth/account';
import { Game } from 'src/app/game';
import { SnackBarModule } from 'src/app/snackbar-module';
import { uniqueName } from './unique-name';

export interface DialogData {
  gameId: number;
  existingPlayers: Account[];
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.html',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SnackBarModule,
  ],
})
export class AddPlayer {
  playerName;

  private data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<AddPlayer>>(MatDialogRef);
  private game = inject(Game);
  private snack = inject(MatSnackBar);

  constructor() {
    this.playerName = new FormControl('', [
      Validators.required,
      uniqueName(this.data.existingPlayers),
    ]);
  }

  addPlayer() {
    this.game.addPlayer(this.playerName.value, this.data.gameId).subscribe(p => {
      this.dialogRef.close(p);
      this.snack.open($localize `Player ${p.name} added`);
    });
  }
}
