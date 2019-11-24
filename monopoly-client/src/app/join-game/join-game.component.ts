import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { GameService } from '../shared/game.service';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
})
export class JoinGameComponent {
  pin = new FormControl();

  constructor(
    private router: Router,
    private game: GameService,
    private auth: AccountService) {

  }

  joinGame() {
    this.game.join(this.pin.value).subscribe(account => {
      this.auth.login(account);
      this.router.navigate(['/account']);
    });
  }
}
