import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BankerModule } from './banker/banker.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MaterialModule } from './material.module';
import { NewGameComponent } from './new-game/new-game.component';
import { PlayerModule } from './player/player.module';

const routes: Route[] = [
  { path: '', pathMatch: 'full', component: MainMenuComponent },
  { path: 'new', component: NewGameComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    NewGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    AuthModule,
    PlayerModule,
    BankerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
