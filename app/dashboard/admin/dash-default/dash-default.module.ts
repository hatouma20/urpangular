import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DashDefaultRoutingModule} from './dash-default-routing.module';
import {ProfileComponent} from './profile/profile.component';


@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        DashDefaultRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule
    ]
})
export class DashDefaultModule {
}
