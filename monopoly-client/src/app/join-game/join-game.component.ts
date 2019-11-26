import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { GameService } from '../shared/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
})
export class JoinGameComponent {
  pin = new FormControl();

  constructor(
    private router: Router,
    private game: GameService) {

  }

  joinGame() {
    this.game.join(this.pin.value).subscribe({
      complete: () => this.router.navigate(['/account'])
    });
  }
}
