import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from './player.service';
import { MaterialModule } from '../material.module';

const routes: Route[] = [
  { path: 'account', component: PlayerDetailComponent, canActivate: [AuthService] },
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
  providers: [PlayerService]
})
export class PlayerModule { }
