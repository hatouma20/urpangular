import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {TagInputModule} from 'ngx-chips';
import { AddCaisseComponent } from './add-caisse/add-caisse.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { AddVirementComponent } from './add-virement/add-virement.component';
import { CaisseComponent } from './caisse/caisse.component';
import { ChequeComponenetComponent } from './cheque-componenet/cheque-componenet.component';
import {DashCaisseRoutingModule} from './dash-caisse-routing.module';
import { VirementResultComponent } from './virement-result/virement-result.component';
@NgModule({
  declarations: [AddCaisseComponent, AddVirementComponent,  AddPaiementComponent, ChequeComponenetComponent,
                 CaisseComponent, VirementResultComponent, AddCurrencyComponent],
  imports: [
    CommonModule,
    DashCaisseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbDatepickerModule,
    TagInputModule,
    AutocompleteLibModule,
    MatAutocompleteModule
  ]
})
export class DashCaisseModule {
}
