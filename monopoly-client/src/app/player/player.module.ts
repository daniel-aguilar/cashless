import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from './player.service';
import { MaterialModule } from '../material.module';

const routes: Route[] = [
  { path: 'account/player', component: PlayerDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TransferMoneyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [PlayerService]
})
export class PlayerModule { }
