import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { PaymentTypeDirective } from './payment-type.directive';

const routes: Route[] = [
  { path: 'account/player', component: PlayerDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TransferMoneyComponent,
    TransactionLogComponent,
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
