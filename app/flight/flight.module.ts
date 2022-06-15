import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {BookModule} from './book/book.module';
import {FlightRoutingModule} from './flight-routing.module';
import {FlightMainComponent} from './fligt-main/flight-main.component';
import {FlightLatestComponent} from './latest/flight-latest.component';
import {ResultModule} from './result/result.module';
import {SearchModule} from './search/search.module';

@NgModule({
  declarations: [FlightMainComponent, FlightLatestComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SearchModule,
    BookModule,
    ResultModule,
    RouterModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class FlightModule {
}
