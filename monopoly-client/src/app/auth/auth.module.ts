import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { JoinGameComponent } from './join-game/join-game.component';

const routes: Route[] = [
  { path: 'join', component: JoinGameComponent },
];

@NgModule({
  declarations: [JoinGameComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
