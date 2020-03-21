import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MaterialModule } from '../material.module';
import { PlayerModule } from '../player/player.module';
import { BankerComponent } from './banker.component';
import { PinHiderDirective } from './pin-hider.directive';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Route[] = [
  { path: 'account/banker', component: BankerComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayerListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    BankerComponent,
    PlayerListComponent,
    PinHiderDirective,
  ],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PlayerModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class BankerModule { }
