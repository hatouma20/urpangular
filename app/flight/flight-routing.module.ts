import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from './fligt-main/flight-main.component';

const ROUTES: Routes = [
  {
    path: '',
    component: FlightMainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.BookModule)
      },
      {
        path: 'result',
        loadChildren: () => import('./result/result.module').then(m => m.ResultModule)
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
  entryComponents: [FlightMainComponent]
})
export class FlightRoutingModule {
}
