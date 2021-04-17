import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { LocalizeNamePipe } from './localize-name.pipe';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { PaymentTypeDirective } from './payment-log/payment-type.directive';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Route[] = [
  { path: 'player', component: PlayerDetailComponent, canActivate: [AuthService] },
  { path: 'transactions', component: TransactionLogComponent, canActivate: [AuthService] },
];

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TransferMoneyComponent,
    PaymentLogComponent,
    PaymentTypeDirective,
    LocalizeNamePipe,
    TransactionLogComponent,
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
