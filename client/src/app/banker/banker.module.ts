import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { PlayerModule } from '../player/player.module';
import { AddPlayerComponent } from './add-player/add-player.component';
import { BankerComponent } from './banker.component';
import { PinHiderDirective } from './pin-hider.directive';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Route[] = [
  { path: 'account/banker', component: BankerComponent, canActivate: [AuthService] },
  { path: 'players', component: PlayerListComponent, canActivate: [AuthService] },
];

@NgModule({
  declarations: [
    BankerComponent,
    PlayerListComponent,
    PinHiderDirective,
    AddPlayerComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PlayerModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
  entryComponents: [AddPlayerComponent],
})
export class BankerModule { }
