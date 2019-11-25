import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinGameComponent } from './join-game/join-game.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinGameComponent,
    AccountDetailComponent,
    TransferMoneyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
