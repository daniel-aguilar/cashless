import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Account } from './auth/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isBanker = false;

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    let account: Account;

    this.auth.getLoginStatus().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        account = this.auth.getLoggedAccount();
        this.isBanker = account.isBanker;
      }
    });
  }
}
