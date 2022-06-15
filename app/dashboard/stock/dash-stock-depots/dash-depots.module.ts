import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {DashDepotsRoutingModule} from './dash-depots-routing.module';
import {StockDepotsComponentComponent} from './stock-depots-component/stock-depots-component.component';

@NgModule({
  declarations: [StockDepotsComponentComponent],
  imports: [
    CommonModule,
    DashDepotsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class DashStockDepotsModule {
}
