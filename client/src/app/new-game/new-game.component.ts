import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GameService } from '../game.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {
  name = new FormControl('', Validators.required);

  constructor(
    private game: GameService,
    private auth: AuthService,
    private router: Router) {

  }

  createGame() {
    this.game.newGame(this.name.value).subscribe(account => {
      this.auth.login(account);
      this.router.navigateByUrl('/account/banker');
    });
  }
}
