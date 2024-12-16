import { Component } from '@angular/core';
import { ContinueGameComponent } from '../auth/continue-game/continue-game.component';
import { MaterialModule } from '../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [
    MaterialModule,
    RouterLink,
    ContinueGameComponent,
  ],
})
export class MainMenuComponent { }
