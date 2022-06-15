
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutgoingHttpHeaders} from 'http2';
import {IncomingInvoiceComponent} from './incoming-invoice/incoming-invoice.component';
import {BonReceptionComponent} from './outgoing-invoice/bon-reception/bon-reception.component';
import {CommandeFournisseurComponent} from './outgoing-invoice/commande-fournisseur/commande-fournisseur.component';
import {FactureFournisseurComponent} from './outgoing-invoice/facture-fournisseur/facture-fournisseur.component';
import {OutgoingInvoiceComponent} from './outgoing-invoice/outgoing-invoice.component';
import {InvoiceComponent} from "./invoice/invoice.component";
import {StepperComponent} from "./invoice/stepper/stepper.component";
import {OutputlineComponent} from "./invoice/lines/outputline/outputline.component";
import {Modele2Component} from "./invoice/modele/modele2/modele2.component";

const ROUTES: Routes = [
  {
    path: 'factureEntrante',
    component: IncomingInvoiceComponent
  },
  {
    path: 'commandefournisseur',
    component: CommandeFournisseurComponent
  },
  {
    path: 'facturefournisseur',
    component: FactureFournisseurComponent
  },
  {
    path: 'bonReception',
    component: BonReceptionComponent
  },
  {
    path: 'factureSortante',
    component: OutgoingInvoiceComponent
  },
  {
    path: 'facture',
    component: InvoiceComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'invoice',
    component: Modele2Component
  },
  {
    path: 'out',
    component: OutputlineComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

  ],
  exports: [
    RouterModule,
  ]
})
export class IncomingInvoiceRoutingModule {
}
