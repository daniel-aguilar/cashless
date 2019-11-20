import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Routes = [
  { path: 'create-bank', component: CreateBankComponent },
  { path: 'join-bank', component: CreateAccountComponent },
  { path: 'account', component: AccountHomeComponent },
  { path: 'transaction', component: TransferMoneyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
