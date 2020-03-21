import { Component, OnInit } from '@angular/core';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  account?: Account;

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
  }

  leaveGame() {
    this.auth.leaveGame();
    this.router.navigateByUrl('/');
  }
}
