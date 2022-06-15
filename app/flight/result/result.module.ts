import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlightResultComponent} from './flight-result/flight-result.component';
import {ResultRoutingModule} from './result-routing.module';


@NgModule({
  declarations: [FlightResultComponent],
  imports: [
    CommonModule,
    ResultRoutingModule
  ]
})
export class ResultModule {
}
