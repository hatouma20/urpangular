import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WindAuthLoginComponent} from './wind-auth-login/wind-auth-login.component';
import {WindAuthMainComponent} from './wind-auth-main/wind-auth-main.component';
import {WindAuthPasswordResetComponent} from './wind-auth-password-reset/wind-auth-password-reset.component';
import {WindAuthRegisterComponent} from './wind-auth-register/wind-auth-register.component';
import {RegisterConfirmationComponent} from './register-confirmation/register-confirmation.component';

const ROUTES: Routes = [
  {
    path: '',
    component: WindAuthMainComponent,
    children: [
      {
        path: '',
        component: WindAuthLoginComponent
      },
      {
        path: 'register',
        component: WindAuthRegisterComponent
      },
      {
        path: 'reset',
        component: WindAuthPasswordResetComponent
      },
      {
        path: 'confirmregister',
        component:  RegisterConfirmationComponent
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
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
