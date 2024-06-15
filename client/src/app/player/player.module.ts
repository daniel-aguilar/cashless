import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { LocalizeNamePipe } from './localize-name.pipe';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const guard = () => inject(AuthService).canActivate();
const routes: Route[] = [
  { path: 'player', component: PlayerDetailComponent, canActivate: [guard] },
  { path: 'transactions', component: TransactionLogComponent, canActivate: [guard] },
];

@NgModule({
  declarations: [
    PlayerDetailComponent,
    TransferMoneyComponent,
    PaymentLogComponent,
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
