import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';
import { LoadingService } from 'src/app/loading/loading.service';
import { AuthService } from './auth.service';

@Directive()
export class Gateway {

  constructor(
    private router: Router,
    private game: GameService,
    private loading: LoadingService,
    protected auth: AuthService) {

  }

  enterGame(pin: string) {
    this.loading.show();
    return this.game.joinGame(pin).toPromise()
        .then(() => {
          const account = this.auth.getLoggedAccount();

          if (account.isBanker) {
            this.router.navigateByUrl('/banker');
          } else {
            this.router.navigateByUrl('/player');
          }
        })
        .finally(() => this.loading.hide());
  }
}
