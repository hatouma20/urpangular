import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BookRoutingModule} from './book-routing.module';
import {HotelBookComponent} from './hotel-book/hotel-book.component';
import {VerifyComponent} from './hotel-book/verify/verify.component';


@NgModule({
  declarations: [VerifyComponent, HotelBookComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule {
}
