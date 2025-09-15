import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import orderBy from 'lodash-es/orderBy';
import { Account } from 'src/app/auth/account';
import { Auth } from 'src/app/auth/auth';
import { Game } from 'src/app/game';
import { AddPlayer, DialogData } from '../add-player/add-player';
import { PinHider } from '../pin-hider';
import { SnackBarModule } from 'src/app/snackbar-module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.html',
  styleUrl: './player-list.css',
  imports: [
    PinHider,
    MatButtonModule,
    MatIconModule,
    SnackBarModule,
  ],
})
export class PlayerList implements OnInit {
  banker: Account;
  players: Account[] = [];

  private auth = inject(Auth);
  private game = inject(Game);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  constructor() {
    this.banker = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.game.getOtherPlayersExcept(this.banker, true)
      .subscribe(players => this.players = players);
  }

  openDialog() {
    const data: DialogData = {
      gameId: this.banker.gameId,
      existingPlayers: this.players.concat(this.banker), // Don't leave the banker out
    };

    this.dialog.open(AddPlayer, { data })
      .afterClosed().subscribe((player: Account) => {
        if (player) {
          this.push(player);
          this.snack.open($localize `Player ${player.name} added`);
        }
      });
  }

  private push(account: Account) {
    this.players.push(account);
    this.players = orderBy(this.players, ['name']);
  }
}
