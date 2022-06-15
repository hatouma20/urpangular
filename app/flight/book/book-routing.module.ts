import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightBookComponent} from './flight-book/flight-book.component';
import {VerifyComponent} from './flight-book/verify/verify.component';


const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FlightBookComponent
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
