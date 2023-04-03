import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  account: Account;
  addMargin = true;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getLoginStatus().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.account = this.auth.getLoggedAccount();
      } else {
        delete this.account;
      }
    });
    this.listenForBankerRoute();
  }

  leaveGame() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  private listenForBankerRoute() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const end = e as NavigationEnd;
      this.addMargin = end.url !== '/banker';
    });
  }
}
