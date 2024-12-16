import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { AddPlayerComponent } from './add-player/add-player.component';
import { BankerComponent } from './banker.component';
import { BankerGuard } from './banker.guard';
import { PinHiderDirective } from './pin-hider.directive';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';

const guards = [
  () => inject(AuthService).canActivate(),
  () => inject(BankerGuard).canActivate(),
];
const routes: Route[] = [
  { path: '', component: BankerComponent, canActivate: guards },
  { path: 'players', component: PlayerListComponent, canActivate: guards },
];

@NgModule({
    declarations: [
        BankerComponent,
        PlayerListComponent,
        PinHiderDirective,
        AddPlayerComponent,
    ],
    providers: [BankerGuard],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ReactiveFormsModule,
        PlayerDetailComponent,
        RouterLink,
    ],
    exports: [
        RouterModule,
    ]
})
export class BankerModule { }
