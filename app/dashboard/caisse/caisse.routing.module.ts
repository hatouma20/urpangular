import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from '../../flight/fligt-main/flight-main.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'caisse',
        loadChildren: () => import('./dash-caisse/dash-caisse.module').then(m => m.DashCaisseModule)
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
export class CaisseRoutingModule {
}
