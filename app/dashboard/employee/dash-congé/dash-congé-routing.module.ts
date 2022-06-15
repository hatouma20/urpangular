import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyEnabledLeaveComponent} from './companyenabledleave/companyenabledleave.component';
import {CompanyholidayComponent} from './companyholiday/companyholiday.component';
import {CongeComponent} from './congé/congé.component';
import {CompanyEnabledRuleComponent} from './regleconge/regleconge.component';
import {RequestLeaveComponent} from './requestleave/requestleave.component';


const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CongeComponent,
      },
      {
        path: 'companyholiday',
        component: CompanyholidayComponent,
      },
      {
        path: 'requestleave',
        component: RequestLeaveComponent,
      },
      {
        path: 'companyenabledleave',
        component: CompanyEnabledLeaveComponent,
      },
      {
        path: 'companyenabledrule',
        component: CompanyEnabledRuleComponent,
      },
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
export class DashCongeRoutingModule {
}
