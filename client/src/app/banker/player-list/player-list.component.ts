import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import orderBy from 'lodash-es/orderBy';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';
import { GameService } from 'src/app/game.service';
import { AddPlayerComponent, DialogData } from '../add-player/add-player.component';
import { PinHiderDirective } from '../pin-hider.directive';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  imports: [
    PinHiderDirective,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PlayerListComponent implements OnInit {
  banker: Account;
  players: Account[] = [];

  private auth = inject(AuthService);
  private game = inject(GameService);
  private dialog = inject(MatDialog);

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
