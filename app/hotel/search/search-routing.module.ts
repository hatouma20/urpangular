import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchFormComponent} from './form/search-form.component';


const ROUTES: Routes = [
  {
    path: '',
    component: SearchFormComponent
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
export class SearchRoutingModule {
}
