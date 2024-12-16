import { Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { TransactionLogComponent } from './player/transaction-log/transaction-log.component';
import { JoinGameComponent } from './auth/join-game/join-game.component';

const guard = () => inject(AuthService).canActivate();
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainMenuComponent },
  { path: 'new', component: NewGameComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'player', component: PlayerDetailComponent, canActivate: [guard] },
  { path: 'transactions', component: TransactionLogComponent, canActivate: [guard] },
  {
    path: 'banker',
    loadChildren: () => import('./banker/banker.module')
        .then(m => m.BankerModule)
  },
  { path: '**', redirectTo: '' }
];
