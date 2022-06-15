import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from '../../flight/fligt-main/flight-main.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fournisseur',
        loadChildren: () => import('./dash-fournisseur/dash-fournisseur.module').then(m => m.DashFournisseurModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  entryComponents: [FlightMainComponent]
})
export class FournisseurRoutingModule {
}
