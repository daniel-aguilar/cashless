import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { JoinGameComponent } from './auth/join-game/join-game.component';
import { BankerGuard } from './banker/banker.guard';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { TransactionLogComponent } from './player/transaction-log/transaction-log.component';

const authGuard = () => inject(AuthService).canActivate();
const bankerGuard = () => inject(BankerGuard).canActivate();
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainMenuComponent },
  { path: 'new', component: NewGameComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'player', component: PlayerDetailComponent, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionLogComponent, canActivate: [authGuard] },
  {
    path: 'banker',
    loadComponent: () => import('./banker/banker.component')
        .then(m => m.BankerComponent),
    canActivate: [authGuard, bankerGuard],
  },
  {
    path: 'banker/players',
    loadComponent: () => import('./banker/player-list/player-list.component')
        .then(m => m.PlayerListComponent),
    canActivate: [authGuard, bankerGuard],
  },
  { path: '**', redirectTo: '' }
];
