import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent {
  pin = new FormControl();

  constructor(
    private router: Router,
    private auth: AuthService) {

  }

  joinGame() {
    this.auth.joinGame(this.pin.value).subscribe({
      complete: () => this.router.navigate(['/account'])
    });
  }
}
