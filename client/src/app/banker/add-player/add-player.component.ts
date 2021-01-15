import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/auth/account';
import { GameService } from 'src/app/game.service';
import { uniqueName } from './unique-name';

export interface DialogData {
  gameId: number;
  existingPlayers: Account[];
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
})
export class AddPlayerComponent {
  playerName: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<AddPlayerComponent>,
    private game: GameService,
    private snack: MatSnackBar) {

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
