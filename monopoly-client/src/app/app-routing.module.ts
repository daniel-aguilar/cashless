import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Route[] = [
    { path: '', pathMatch: 'full', component: MainMenuComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
