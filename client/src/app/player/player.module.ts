import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PaymentTypeDirective } from './transaction-log/payment-type.directive';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Route[] = [
  { path: 'player', component: PlayerDetailComponent, canActivate: [AuthService] },
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
