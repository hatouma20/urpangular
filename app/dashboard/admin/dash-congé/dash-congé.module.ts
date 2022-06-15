import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatTableModule, MatTabsModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgbDatepickerModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarDayModule, CalendarModule, CalendarMonthModule, CalendarWeekModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {DataTablesModule} from 'angular-datatables';
import {FlatpickrModule} from 'angularx-flatpickr';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ChartsModule} from 'ng2-charts';
import {CollaboratorleaveComponent} from './collaboratorleave/collaboratorleave.component';
import {CompanyEnabledLeaveComponent} from './companyenabledleave/companyenabledleave.component';
import {CompanyholidayComponent} from './companyholiday/companyholiday.component';
import {CongeComponent} from './congé/congé.component';
import {DashCongeRoutingModule} from './dash-congé-routing.module';
import {FichedepaieComponent} from './fichedepaie/fichedepaie.component';
import {HistoriqueLeaveComponent} from './historique/historique.component';
import {HistoriqueByCollaboratorComponent} from './historiqueByCollaborator/historiqueByCollaborator.component';
import {PointageComponent} from './pointage/pointage.component';
import {CompanyEnabledRuleComponent} from './regleconge/regleconge.component';
import {RequestLeaveComponent} from './requestleave/requestleave.component';
import {CalendarHeaderComponent} from './utils/calendar-header.component';

@NgModule({
    declarations: [CongeComponent, CollaboratorleaveComponent,
        CalendarHeaderComponent, CompanyEnabledLeaveComponent,
        CompanyholidayComponent, CompanyEnabledRuleComponent,
        RequestLeaveComponent, HistoriqueLeaveComponent, HistoriqueByCollaboratorComponent,
        FichedepaieComponent, PointageComponent],
    imports: [
        NgbModalModule,
        FlatpickrModule.forRoot(),

        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        CommonModule,
        DashCongeRoutingModule,
        CalendarMonthModule,
        CalendarWeekModule,
        CalendarDayModule,
        FormsModule,
        NgbDatepickerModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        MatFormFieldModule,
        NgbDatepickerModule,
        DataTablesModule,
        MatTabsModule,
        ChartsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        CompanyEnabledRuleComponent
    ]
})
export class DashCongeModule {
}

