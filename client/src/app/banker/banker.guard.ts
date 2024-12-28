import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BankerGuard {
  private auth = inject(AuthService);

  canActivate() {
    const player = this.auth.getLoggedAccount();
    return player.isBanker;
  }
}
