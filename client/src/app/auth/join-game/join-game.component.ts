import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';
import { Account } from '../account';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private game: GameService,
    private auth: AuthService) {

    this.form = this.fb.group({ pin: '' });
  }

  joinGame() {
    const pin = this.form.value.pin as string;
    let account: Account;

    this.game.joinGame(pin).subscribe({
      complete: () => {
        account = this.auth.getLoggedAccount();

        if (account.isBanker) {
          this.router.navigateByUrl('/account/banker');
        } else {
          this.router.navigateByUrl('/account/player');
        }
      }
    });
  }
}
