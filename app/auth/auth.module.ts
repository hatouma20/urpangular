import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {AuthRoutingModule} from './auth-routing.module';
import {WindAuthLoginComponent} from './wind-auth-login/wind-auth-login.component';
import {WindAuthMainComponent} from './wind-auth-main/wind-auth-main.component';
import {WindAuthPasswordResetComponent} from './wind-auth-password-reset/wind-auth-password-reset.component';
import {WindAuthRegisterComponent} from './wind-auth-register/wind-auth-register.component';
import {RegisterConfirmationComponent} from './register-confirmation/register-confirmation.component';


@NgModule({
  declarations: [WindAuthMainComponent, WindAuthLoginComponent, WindAuthRegisterComponent, WindAuthPasswordResetComponent, RegisterConfirmationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule
  ]
})
export class AuthModule {
}
