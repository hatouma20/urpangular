import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashFraisRoutingModule} from './dash-frais-routing.module';
import {FraisComponent} from './frais/frais.component';

@NgModule({
  declarations: [FraisComponent],
  imports: [
    CommonModule,
    DashFraisRoutingModule
  ]
})
export class DashFraisModule {
}
