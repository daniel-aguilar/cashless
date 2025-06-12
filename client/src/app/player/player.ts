import { Injectable, inject } from '@angular/core';
import { Account } from '../auth/account';
import { Auth } from '../auth/auth';

/**
 * Service to share a common instance of a player's account.
 * The default instance being the currently logged-in player
 */
@Injectable()
export class Player {
  account: Account;

  private auth = inject(Auth);

  constructor() {
    this.account = this.auth.getLoggedAccount();
  }
}
