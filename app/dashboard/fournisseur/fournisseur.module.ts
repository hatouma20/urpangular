import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FournisseurRoutingModule} from './fournisseur.routing.module';
import {DataTablesModule} from 'angular-datatables';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FournisseurRoutingModule,

    DataTablesModule
  ]
})
export class FournisseurModule {
}

