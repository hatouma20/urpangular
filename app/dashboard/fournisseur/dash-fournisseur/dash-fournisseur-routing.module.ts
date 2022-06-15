import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankAccountsComponent} from './bank-accounts/bank-accounts.component';
import {ContactadresseComponent} from './contactadresse/contactadresse.component';
import {FournisseurListComponent} from './fournisseur-list/fournisseur-list.component';
import {FournisseurProfileComponent} from './fournisseur-profile/fournisseur-profile.component';
import {FournisseurComponent} from './fournisseur/fournisseur.component';

const ROUTES: Routes = [
  {
    path: '',
    component: FournisseurComponent
  },
  {
    path: 'profile',
    component: FournisseurProfileComponent
  },
  {
    path: 'list',
    component: FournisseurListComponent
  },
  {
    path: 'adresse',
    component: ContactadresseComponent
  },
  {
    path: 'bankaccount',
    component: BankAccountsComponent
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
export class DashFournisseurRoutingModule {
}
