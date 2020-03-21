import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  banker: Account;
  players!: Observable<Account[]>;

  constructor(private auth: AuthService) {
    this.banker = this.auth.getLoggedAccount();
  }

  ngOnInit() {
    this.players = this.auth.getOtherPlayers(this.banker, true);
  }
}
