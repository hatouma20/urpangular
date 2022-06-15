import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStockComponentComponent} from './add-stock-component/add-stock-component.component';
import {ListStockComponentComponent} from './list-stock-component/list-stock-component.component';
import {ListStockWithAttributesComponent} from './list-stock-with-attributes/list-stock-with-attributes.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AddStockComponentComponent
  },

  {
    path: 'list',
    component: ListStockComponentComponent
  },
  {
    path: 'liststockwithattributes',
    component: ListStockWithAttributesComponent
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
export class DashStockRoutingModule {
}
