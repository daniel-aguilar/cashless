import { Injectable, inject } from '@angular/core';
import { Auth } from '../auth/auth';

@Injectable({ providedIn: 'root' })
export class BankerGuard {
  private auth = inject(Auth);

  canActivate() {
    const account = this.auth.getLoggedAccount();
    return account.isBanker;
  }
}
