import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRippleModule,
  MatSelectModule,
  MatStepperModule
} from '@angular/material';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {TagInputModule} from 'ngx-chips';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { ContactadresseComponent } from './contactadresse/contactadresse.component';
import { DashFournisseurRoutingModule} from './dash-fournisseur-routing.module';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurProfileComponent } from './fournisseur-profile/fournisseur-profile.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [FournisseurComponent,
    FournisseurProfileComponent,
    FournisseurListComponent,
    ContactadresseComponent,
    BankAccountsComponent],
  imports: [
    CommonModule,
    DashFournisseurRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbDatepickerModule,
    TagInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatStepperModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        FournisseurComponent,
        ContactadresseComponent,
        BankAccountsComponent
    ]
})
export class DashFournisseurModule {
}
