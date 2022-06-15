import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HotelMainComponent} from './hotel-main/hotel-main.component';
import {HotelRoutingModule} from './hotel-routing.module';
import {HotelLatestComponent} from './latest/hotel-latest.component';

@NgModule({
  declarations: [HotelMainComponent, HotelLatestComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    RouterModule
  ],
  exports: [RouterModule]
})
export class HotelModule {
}
