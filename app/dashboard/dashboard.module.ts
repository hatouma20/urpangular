import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {DashMainComponent} from './dash-main/dash-main.component';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {NavBarComponent} from './navbar/navbar.component';
import {SideBarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [DashMainComponent, SideBarComponent, NavBarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SharedModule,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class DashboardModule {
}
