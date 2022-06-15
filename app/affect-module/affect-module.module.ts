import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {AffectModulePartnerComponent} from './affect-module-partner/affect-module-partner.component';
import {AffectModuleRouting} from './affect-module-routing.module';

@NgModule({
  declarations: [AffectModulePartnerComponent],
  imports: [
    CommonModule,
    AffectModuleRouting,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule
  ]
})
export class AffectModulesModule {
}
