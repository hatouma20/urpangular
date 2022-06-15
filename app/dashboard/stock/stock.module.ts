import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StockRoutingModule} from './stock.routing.module';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StockRoutingModule,
    NgMultiSelectDropDownModule

  ]
})
export class StockModule {
}
