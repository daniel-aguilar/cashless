import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { BankerComponent } from './banker.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Route[] = [
  { path: 'account/banker', component: BankerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [BankerComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BankerModule { }
