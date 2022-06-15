import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from '../../flight/fligt-main/flight-main.component';
import {AuthorizedGuard} from '../../shared/guard/authorized.guard';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./dash-default/dash-default.module').then(m => m.DashDefaultModule)
      },
      {
        path: 'coordonnees',
        loadChildren: () => import('./dash-coordonnees/dash-coordonnees.module').then(m => m.DashCoordonneesModule)
      },
      {
        path: 'infocontrat',
        loadChildren: () => import('./dash-contrat/dash-contrat.module').then(m => m.DashContratModule)
      },
      {
        path: 'frais',
        loadChildren: () => import('./dash-frais/dash-frais.module').then(m => m.DashFraisModule)
      },
      {
        path: 'conge',
        canActivate: [AuthorizedGuard],
        loadChildren: () => import('./dash-congé/dash-congé.module').then(m => m.DashCongeModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./dash-document/dash-document.module').then(m => m.DashDocumentModule)
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
  entryComponents: [FlightMainComponent]
})
export class AdminEmployeeModule {
}
