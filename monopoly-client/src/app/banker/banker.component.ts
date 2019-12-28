import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { BankService } from './bank.service';
import { Account } from '../auth/account';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.scss'],
})
export class BankerComponent implements OnInit {
  player: Account;
  bank?: Account;

  @ViewChildren(PlayerDetailComponent)
  accounts!: QueryList<PlayerDetailComponent>;

  constructor(
    private bankService: BankService,
    private auth: AuthService) {

    this.player = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.bankService.getBankAccount(this.player.gameId).subscribe(
      bank => this.bank = bank
    );
  }

  updateBalance(e: MatTabChangeEvent) {
    const tab = this.accounts.toArray()[e.index];
    tab.updateBalance();
  }
}
