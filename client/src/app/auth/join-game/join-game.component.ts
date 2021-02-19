import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';
import { LoadingService } from 'src/app/loading/loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  form: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private game: GameService,
    private auth: AuthService,
    private loading: LoadingService) {

    this.form = this.fb.group({
      pin: ['', Validators.required],
    });
  }

  joinGame() {
    const pin = this.form.value.pin as string;
    this.loading.show();
    this.game.joinGame(pin).subscribe({
      complete: () => {
        this.loading.hide();
        const account = this.auth.getLoggedAccount();

        if (account.isBanker) {
          this.router.navigateByUrl('/banker');
        } else {
          this.router.navigateByUrl('/player');
        }
      },
      error: () => {
        this.loading.hide();
        this.displayError();
      },
    });
  }

  private displayError() {
    this.error = true;
    setTimeout(() => this.error = false, 3000);
  }
}
