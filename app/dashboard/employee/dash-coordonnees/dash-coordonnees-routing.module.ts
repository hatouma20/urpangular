import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoordonneesComponent} from './coordonnees/coordonnees.component';


const ROUTES: Routes = [
  {
    path: '',
    component: CoordonneesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class DashCoordonneesRoutingModule {
}
