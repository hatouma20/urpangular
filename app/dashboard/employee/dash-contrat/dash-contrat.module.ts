import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatPaginatorModule, MatTableModule} from '@angular/material';
import {DashContratRoutingModule} from './dash-contrat-routing.module';
import {InfoContratComponent} from './info-contrat/info-contrat.component';

@NgModule({
  declarations: [InfoContratComponent],
  imports: [
    CommonModule,
    DashContratRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class DashContratModule {
}
