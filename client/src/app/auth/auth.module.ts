import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
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
    MaterialModule,
  ]
})
export class AuthModule { }
