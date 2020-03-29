import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  providers: [PlayerService],
})
export class PlayerDetailComponent implements OnInit {
  player: Account;
  balance = 0;

  @Input()
  set account(account: Account) {
    this.player = this.currentPlayer.account = account;
  }

  constructor(
    private currentPlayer: PlayerService,
    private bank: BankService) {

    this.player = this.currentPlayer.account;
  }

  ngOnInit() {
    this.updateBalance();
  }

  updateBalance() {
    this.bank.getBalance(this.player).subscribe(n => this.balance = n);
  }
}
