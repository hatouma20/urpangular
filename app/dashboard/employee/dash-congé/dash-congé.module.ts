import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatTableModule} from '@angular/material';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarDayModule, CalendarMonthModule, CalendarWeekModule} from 'angular-calendar';
import {DataTablesModule} from 'angular-datatables';
import {CompanyEnabledLeaveComponent} from './companyenabledleave/companyenabledleave.component';
import {CompanyholidayComponent} from './companyholiday/companyholiday.component';
import {CongeComponent} from './congé/congé.component';
import {DashCongeRoutingModule} from './dash-congé-routing.module';
import {CompanyEnabledRuleComponent} from './regleconge/regleconge.component';
import {RequestLeaveComponent} from './requestleave/requestleave.component';

@NgModule({
  declarations: [CongeComponent, CompanyholidayComponent,
    RequestLeaveComponent, CompanyEnabledLeaveComponent, CompanyEnabledRuleComponent],
  imports: [
    CommonModule,
    DashCongeRoutingModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    FormsModule,
    DataTablesModule,
    NgbDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class DashCongeModule {
}
