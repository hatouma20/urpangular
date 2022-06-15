import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CoordonneesComponent} from './coordonnees/coordonnees.component';
import {DashCoordonneesRoutingModule} from './dash-coordonnees-routing.module';


@NgModule({
  declarations: [CoordonneesComponent],
  imports: [
    CommonModule,
    DashCoordonneesRoutingModule
  ]
})
export class DashCoordonneesModule {
}
