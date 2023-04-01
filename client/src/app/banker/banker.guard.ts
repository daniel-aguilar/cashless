import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BankerGuard {
  constructor(private auth: AuthService) { }

  canActivate() {
    const player = this.auth.getLoggedAccount();
    return player.isBanker;
  }
}
