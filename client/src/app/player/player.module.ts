import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { PaymentTypeDirective } from './payment-log/payment-type.directive';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Route[] = [
  { path: 'player', component: PlayerDetailComponent, canActivate: [AuthService] },
];

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TransferMoneyComponent,
    PaymentLogComponent,
    PaymentTypeDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    RouterModule,
    PlayerDetailComponent,
  ],
})
export class PlayerModule { }
