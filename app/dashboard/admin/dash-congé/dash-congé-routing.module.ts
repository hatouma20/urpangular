import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizedGuard} from '../../../shared/guard/authorized.guard';
import {CollaboratorleaveComponent} from './collaboratorleave/collaboratorleave.component';
import {CompanyEnabledLeaveComponent} from './companyenabledleave/companyenabledleave.component';
import {CompanyholidayComponent} from './companyholiday/companyholiday.component';
import {FichedepaieComponent} from './fichedepaie/fichedepaie.component';
import {HistoriqueLeaveComponent} from './historique/historique.component';
import {HistoriqueByCollaboratorComponent} from './historiqueByCollaborator/historiqueByCollaborator.component';
import {PointageComponent} from './pointage/pointage.component';
import {CompanyEnabledRuleComponent} from './regleconge/regleconge.component';
import {RequestLeaveComponent} from './requestleave/requestleave.component';


const ROUTES: Routes = [
  {
    path: '',
    // canActivate: [AuthorizedGuard],
    children: [
      {
        path: 'historique',
        component: HistoriqueLeaveComponent,
      },
      {
        path: 'collaboratorleave',
        component: CollaboratorleaveComponent,
      },
      {
        path: 'companyenabledleave',
        component: CompanyEnabledLeaveComponent,
      },
      {
        path: 'companyholiday',
        component: CompanyholidayComponent,
      },
      {
        path: 'companyenabledrule',
        component: CompanyEnabledRuleComponent,
      },
      {
        path: 'requestleave',
        component: RequestLeaveComponent,
      },
      {
        path: 'historiqueByCollabrator/:uuid',
        component: HistoriqueByCollaboratorComponent
      },
      {
        path: 'pointage',
        component: PointageComponent
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
export class DashCongeRoutingModule {
}
