import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockDepotsComponentComponent} from './stock-depots-component/stock-depots-component.component';

const ROUTES: Routes = [
  {
    path: '',
    component: StockDepotsComponentComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class DashDepotsRoutingModule {
}
