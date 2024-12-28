import { Component, OnInit, inject } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { Account } from '../auth/account';
import { AuthService } from '../auth/auth.service';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { BankService } from './bank.service';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  imports: [
    MatTabsModule,
    PlayerDetailComponent,
  ],
})
export class BankerComponent implements OnInit {
  player: Account;
  bank: Account;
  isHandset = false;

  private bankService = inject(BankService);
  private auth = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.player = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.bankService.getBankAccount(this.player.gameId).subscribe(
      bank => this.bank = bank
    );
    this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(res => this.isHandset = res.matches);
  }
}
