import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoadingComponent } from './loading/loading.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MaterialModule } from './material.module';
import { NewGameComponent } from './new-game/new-game.component';
import { PlayerModule } from './player/player.module';

const routes: Route[] = [
  { path: '', pathMatch: 'full', component: MainMenuComponent },
  { path: 'new', component: NewGameComponent },
  {
    path: 'banker',
    loadChildren: () => import('./banker/banker.module')
        .then(m => m.BankerModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    NewGameComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    RouterModule.forRoot(routes, { useHash: true }),
    MaterialModule,
    AuthModule,
    PlayerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(),
  ]
})
export class AppModule { }
