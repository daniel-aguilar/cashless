import { Component } from '@angular/core';
import { ContinueGame } from '../auth/continue-game/continue-game';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  imports: [
    MatButtonModule,
    RouterLink,
    ContinueGame,
  ],
})
export class MainMenu { }
