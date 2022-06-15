import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoContratComponent} from './info-contrat/info-contrat.component';


const ROUTES: Routes = [
  {
    path: '',
    component: InfoContratComponent
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
export class DashContratRoutingModule {
}
