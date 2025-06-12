import { Injectable, inject } from '@angular/core';
import { Auth } from '../auth/auth';

@Injectable({ providedIn: 'root' })
export class BankerGuard {
  private auth = inject(Auth);

  canActivate() {
    const player = this.auth.getLoggedAccount();
    return player.isBanker;
  }
}
