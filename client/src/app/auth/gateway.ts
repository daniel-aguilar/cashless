import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Game } from 'src/app/game';
import { Loading } from 'src/app/loading-spinner/loading';
import { Auth } from './auth';

@Directive()
export class Gateway {
  private router = inject(Router);
  private game = inject(Game);
  private loading = inject(Loading);
  protected auth = inject(Auth);

  enterGame(pin: string) {
    this.loading.show();
    return this.game.joinGame(pin)
      .pipe(finalize(() => {
        this.loading.hide();
        const account = this.auth.getLoggedAccount();

        if (account.isBanker) {
          this.router.navigateByUrl('/banker');
        } else {
          this.router.navigateByUrl('/player');
        }
      }));
  }
}
