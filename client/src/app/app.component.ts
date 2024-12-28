
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    LoadingComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
]
})
export class AppComponent implements OnInit {
  account: Account;
  addMargin = true;

  private auth = inject(AuthService);
  private router = inject(Router);

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
