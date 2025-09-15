import { Injectable, inject } from '@angular/core';
import { Auth } from '../auth/auth';

/**
 * Service to share a common instance of a player's account.
 * The default instance being the currently logged-in player
 */
@Injectable()
export class CurrentAccount {
  private auth = inject(Auth);
  instance = this.auth.getLoggedAccount();
}
