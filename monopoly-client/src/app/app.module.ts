import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    MatToolbarModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    PlayerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
