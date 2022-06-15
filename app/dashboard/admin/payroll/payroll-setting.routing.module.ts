import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PayrollSettingComponent} from './payroll-setting/payroll-setting.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PayrollSettingComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class PayrollSettingRoutingModule {
}
