import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Account } from '../account';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent {
  joinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService) {

    this.joinForm = this.fb.group({
      pin: '',
    });
  }

  joinGame() {
    const pin = this.joinForm.value.pin as string;
    let account: Account;

    this.auth.joinGame(pin).subscribe({
      complete: () => {
        account = this.auth.getLoggedAccount();

        if (account.isBanker) {
          this.router.navigate(['/account/banker']);
        } else {
          this.router.navigate(['/account/player']);
        }
      }
    });
  }
}
