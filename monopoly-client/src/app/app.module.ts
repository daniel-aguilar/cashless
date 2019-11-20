import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBankComponent,
    CreateAccountComponent,
    AccountHomeComponent,
    TransferMoneyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
