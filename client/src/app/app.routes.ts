import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { JoinGame } from './auth/join-game/join-game';
import { BankerGuard } from './banker/banker-guard';
import { MainMenu } from './main-menu/main-menu';
import { NewGame } from './new-game/new-game';
import { PlayerDetail } from './player/player-detail/player-detail';
import { TransactionLog } from './player/transaction-log/transaction-log';

const authGuard = () => inject(Auth).canActivate();
const bankerGuard = () => inject(BankerGuard).canActivate();
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainMenu },
  { path: 'new', component: NewGame },
  { path: 'join', component: JoinGame },
  { path: 'player', component: PlayerDetail, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionLog, canActivate: [authGuard] },
  {
    path: 'banker',
    loadComponent: () => import('./banker/banker')
        .then(m => m.Banker),
    canActivate: [authGuard, bankerGuard],
  },
  {
    path: 'banker/players',
    loadComponent: () => import('./banker/player-list/player-list')
        .then(m => m.PlayerList),
    canActivate: [authGuard, bankerGuard],
  },
  { path: '**', redirectTo: '' }
];
