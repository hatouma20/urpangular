import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HotelBookComponent} from './hotel-book/hotel-book.component';
import {VerifyComponent} from './hotel-book/verify/verify.component';


const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HotelBookComponent
      },
      {
        path: 'verify',
        component: VerifyComponent
      }
    ]
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
export class BookRoutingModule {
}
