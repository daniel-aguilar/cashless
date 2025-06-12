import { Component, OnInit } from '@angular/core';
import { Gateway } from '../gateway';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-continue-game',
  templateUrl: './continue-game.html',
  imports: [ MatButtonModule ],
})
export class ContinueGame extends Gateway implements OnInit {
  canContinueGame = false;
  private pin: string;

  ngOnInit() {
    this.pin = this.auth.savedPin;
    this.canContinueGame = Boolean(this.pin);
  }

  async continueGame() {
    this.enterGame(this.pin).subscribe({
      error: () => {
        this.canContinueGame = false;
        this.auth.logout();
      }
    });
  }
}
