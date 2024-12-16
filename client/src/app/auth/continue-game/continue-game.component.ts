import { Component, OnInit } from '@angular/core';
import { Gateway } from '../gateway';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-continue-game',
  templateUrl: './continue-game.component.html',
  styleUrls: ['./continue-game.component.scss'],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class ContinueGameComponent extends Gateway implements OnInit {
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
