import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from '../../flight/fligt-main/flight-main.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stock',
        loadChildren: () => import('./dash-stock/dash-stock.module').then(m => m.DashStockModule)
      },
      {
        path: 'depots',
        loadChildren: () => import('./dash-stock-depots/dash-depots.module').then(m => m.DashStockDepotsModule)
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
export class StockRoutingModule {
}
