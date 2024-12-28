import { Component } from '@angular/core';
import { ContinueGameComponent } from '../auth/continue-game/continue-game.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [
    MatButtonModule,
    RouterLink,
    ContinueGameComponent,
  ],
})
export class MainMenuComponent { }
