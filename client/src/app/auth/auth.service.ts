import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Account } from './account';

const pinKey = 'pin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  savedPin: string;

  private account: Account;
  private isLoggedIn = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.watchPointOfNoReturnRoutes();
    this.savedPin = localStorage.getItem(pinKey);
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
          this.removeAccountAndNotify();
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
    localStorage.setItem(pinKey, account.pin);
    this.isLoggedIn.next(true);
  }

  logout() {
    this.savedPin = null;
    localStorage.removeItem(pinKey);
    this.removeAccountAndNotify();
  }

  private removeAccountAndNotify() {
    delete this.account;
    this.isLoggedIn.next(false);
  }
}
