import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncomingInvoiceComponent} from "./invoices/incoming-invoice/incoming-invoice.component";

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile-society',
        loadChildren: () => import('./dash-profile/dash-profile.module').then(m => m.DashProfileModule)
      },
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
        loadChildren: () => import('./dash-congé/dash-congé.module').then(m => m.DashCongeModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./dash-document/dash-document.module').then(m => m.DashDocumentModule)
      },
      {
        path: 'collaborators',
        loadChildren: () => import('./dash-collaborators/dash-collaborators.module').then(m => m.DashCollaboratorsModule)
      },
      {
        path: 'template',
        loadChildren: () => import('./dash-template/dash-template.module').then(m => m.DashTemplateModule)
      },
      {
        path: 'payroll',
        loadChildren: () => import('./payroll/payroll-setting.module').then(m => m.PayrollSettingModule)
      },
      {
        path: 'facture',
        loadChildren: () => import('./invoices/incomming-invoice.module').then(m => m.IncomingInvoiceModule)
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
export class AdminRoutingModule {
}
