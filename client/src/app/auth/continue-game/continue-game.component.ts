import { Component, OnInit } from '@angular/core';
import { Gateway } from '../gateway';

@Component({
  selector: 'app-continue-game',
  templateUrl: './continue-game.component.html',
  styleUrls: ['./continue-game.component.scss']
})
export class ContinueGameComponent extends Gateway implements OnInit {
  canContinueGame = false;
  private pin: string;

  ngOnInit() {
    this.pin = this.auth.savedPin;
    this.canContinueGame = Boolean(this.pin);
  }

  async continueGame() {
    try {
      await this.enterGame(this.pin);
    }
    catch (error) {
      this.canContinueGame = false;
      this.auth.logout();
    }
  }
}
