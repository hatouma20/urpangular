import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DashProfileRoutingModule} from './dash-profile.routing.module';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    DashProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule
  ]
})
export class DashProfileModule {
}
