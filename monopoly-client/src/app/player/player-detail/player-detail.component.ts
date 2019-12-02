import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  name = '';
  balance = 0;

  constructor(private player: PlayerService) {

  }

  ngOnInit() {
    this.name = this.player.name;
    this.updateBalance();
  }

  updateBalance() {
    this.player.getBalance().subscribe(n => this.balance = n);
  }
}
