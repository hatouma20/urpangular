import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BookRoutingModule} from './book-routing.module';
import {FlightBookComponent} from './flight-book/flight-book.component';
import {VerifyComponent} from './flight-book/verify/verify.component';


@NgModule({
  declarations: [FlightBookComponent, VerifyComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule {
}
