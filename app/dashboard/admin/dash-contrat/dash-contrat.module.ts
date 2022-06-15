import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {DashContratRoutingModule} from './dash-contrat-routing.module';
import {GestionDurationComponent} from './gestion-duration/gestion-duration.component';
import {GestionTypeComponent} from './gestion-type/gestion-type.component';
import {HiringReasonComponent} from './hiringreason/hiringreason.component';
import {HistoriqueComponent} from './historique/historique.component';
import {InfoContratComponent} from './info-contrat/info-contrat.component';
import {LeavingReasonComponent} from './leavingreason/leavingreason.component';
import {ListeContratComponent} from './listecontrats/listecontrat.component';

@NgModule({
  declarations: [InfoContratComponent, GestionDurationComponent, HistoriqueComponent, GestionTypeComponent, ListeContratComponent,
    HiringReasonComponent, LeavingReasonComponent],
  imports: [
    CommonModule,
    DashContratRoutingModule,
    FormsModule,
     DataTablesModule
  ]
})
export class DashContratModule {
}
