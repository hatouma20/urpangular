import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCaisseComponent} from './add-caisse/add-caisse.component';
import {AddCurrencyComponent} from './add-currency/add-currency.component';
import {AddPaiementComponent} from './add-paiement/add-paiement.component';
import {AddVirementComponent} from './add-virement/add-virement.component';
import {CaisseComponent} from './caisse/caisse.component';
import {ChequeComponenetComponent} from './cheque-componenet/cheque-componenet.component';
import {VirementResultComponent} from './virement-result/virement-result.component';
const ROUTES: Routes = [
  {
    path: '',
    component: AddCaisseComponent
  },
  {
    path: 'virement',
    component: AddVirementComponent
  },
  {
    path: 'paiement',
    component: AddPaiementComponent
  },
  {
    path: 'cheques',
    component: ChequeComponenetComponent
  },
  {
    path: 'caisseview',
    component: CaisseComponent
  },
  {
    path: 'result',
    component: VirementResultComponent
  },
  {
    path: 'currency',
    component: AddCurrencyComponent
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
export class DashCaisseRoutingModule {
}
