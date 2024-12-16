import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    LoadingComponent,
    MatToolbar,
    MaterialModule,
    RouterOutlet,
    RouterLink,
  ]
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
