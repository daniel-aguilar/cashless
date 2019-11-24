import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinGameComponent } from './join-game/join-game.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountService } from './shared/account.service';

const routes: Routes = [
  { path: 'join', component: JoinGameComponent },
  { path: 'account', component: AccountDetailComponent, canActivate: [AccountService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
