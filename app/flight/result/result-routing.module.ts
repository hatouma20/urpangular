import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightResultComponent} from './flight-result/flight-result.component';


const ROUTES: Routes = [
  {
    path: '',
    component: FlightResultComponent
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
export class ResultRoutingModule {
}
