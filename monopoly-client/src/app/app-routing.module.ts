import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';

const routes: Route[] = [
    { path: '', pathMatch: 'full', component: MainMenuComponent },
    { path: 'new', component: NewGameComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
