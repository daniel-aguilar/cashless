import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Account } from './account';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate {
  private account: Account;
  private isLoggedIn = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.watchPointOfNoReturnRoutes();
  }

  canActivate() {
    try {
      return Boolean(this.getLoggedAccount());
    } catch (error) {
      return this.router.parseUrl('/');
    }
  }

  watchPointOfNoReturnRoutes() {
    const routes = ['/', '/join', '/new'];
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (routes.includes(e.url)) {
          this.logout();
        }
      }
    });
  }

  // This could be an accessor, but Jasmine's
  // spies don't work too well with them.
  getLoginStatus() {
    return this.isLoggedIn.asObservable();
  }

  getLoggedAccount() {
    if (this.account) {
      return this.account;
    }
    throw Error('User is not logged in');
  }

  login(account: Account) {
    this.account = account;
    this.isLoggedIn.next(true);
  }

  logout() {
    delete this.account;
    this.isLoggedIn.next(false);
  }
}
