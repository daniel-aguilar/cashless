import { Injectable, inject } from '@angular/core';
import { Account } from '../auth/account';
import { AuthService } from '../auth/auth.service';

/**
 * Service to share a common instance of a player's account.
 * The default instance being the currently logged-in player
 */
@Injectable()
export class PlayerService {
  account: Account;

  private auth = inject(AuthService);

  constructor() {
    this.account = this.auth.getLoggedAccount();
  }
}
