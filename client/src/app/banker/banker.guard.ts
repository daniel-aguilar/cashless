import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BankerGuard implements CanActivate {
  constructor(private auth: AuthService) { }

  canActivate() {
    const player = this.auth.getLoggedAccount();
    return player.isBanker;
  }
}
