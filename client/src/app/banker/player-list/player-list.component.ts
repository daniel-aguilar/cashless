import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import orderBy from 'lodash-es/orderBy';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';
import { GameService } from 'src/app/game.service';
import { AddPlayerComponent, DialogData } from '../add-player/add-player.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  banker: Account;
  players: Account[] = [];

  constructor(
    private auth: AuthService,
    private game: GameService,
    private dialog: MatDialog) {

    this.banker = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.game.getOtherPlayersExcept(this.banker, true)
      .subscribe(players => this.players = players);
  }

  openDialog() {
    const data: DialogData = {
      gameId: this.banker.gameId,
      existingPlayers: this.players.concat(this.banker), // Don't leave banker out
    };

    this.dialog.open(AddPlayerComponent, { data })
      .afterClosed().subscribe((player: Account) => {
        if (player) {
          this.push(player);
        }
      });
  }

  private push(account: Account) {
    this.players.push(account);
    this.players = orderBy(this.players, ['name']);
  }
}
