import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TagInputModule} from 'ngx-chips';
import { AddStockComponentComponent } from './add-stock-component/add-stock-component.component';
import {DashStockRoutingModule} from './dash-stock-routing.module';
import { ListStockComponentComponent } from './list-stock-component/list-stock-component.component';
import { ListStockWithAttributesComponent } from './list-stock-with-attributes/list-stock-with-attributes.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
@NgModule({
  declarations: [AddStockComponentComponent, ListStockComponentComponent, ListStockWithAttributesComponent],
  imports: [
    CommonModule,
    DashStockRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    TagInputModule,
    NgMultiSelectDropDownModule,
    MatStepperModule,
    MatFormFieldModule
  ]
})
export class DashStockModule {
}
