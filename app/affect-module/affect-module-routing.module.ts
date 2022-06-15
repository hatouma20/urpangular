import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AffectModulePartnerComponent} from './affect-module-partner/affect-module-partner.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AffectModulePartnerComponent,
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
export class AffectModuleRouting {
}
