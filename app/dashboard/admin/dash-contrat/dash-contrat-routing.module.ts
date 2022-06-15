import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GestionDurationComponent} from './gestion-duration/gestion-duration.component';
import {GestionTypeComponent} from './gestion-type/gestion-type.component';
import {HiringReasonComponent} from './hiringreason/hiringreason.component';
import {HistoriqueComponent} from './historique/historique.component';
import {InfoContratComponent} from './info-contrat/info-contrat.component';
import {LeavingReasonComponent} from './leavingreason/leavingreason.component';
import {ListeContratComponent} from './listecontrats/listecontrat.component';


const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gestionduration',
        component: GestionDurationComponent,
      },
      {
        path: '',
        component: InfoContratComponent,
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
      },
      {
        path: 'gestiontype',
        component: GestionTypeComponent,
      },
      {
        path: 'listecontrat',
        component: ListeContratComponent,
      },
      {
        path: 'hiringreason',
        component: HiringReasonComponent,
      },
      {
        path: 'leavingreason',
        component: LeavingReasonComponent,
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
export class DashContratRoutingModule {
}
