import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {SharedModule} from '../../../shared/shared.module';
import {DashFournisseurModule} from '../../fournisseur/dash-fournisseur/dash-fournisseur.module';
import {IncomingInvoiceRoutingModule} from './icomming-invoice.routing.module';
import {IncomingInvoiceComponent} from './incoming-invoice/incoming-invoice.component';

import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserModule} from '@angular/platform-browser';

import {AngularEditorModule} from '@kolkov/angular-editor';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import {StepperService} from '../../../shared/services/back-end/stepperservice/stepperService';
import {DateComponent} from './invoice/dates/date.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {DeviseComponent} from './invoice/langue-devise/devise.component';
import {CommentComponent} from './invoice/lines/comment/comment.component';
import {OutputlineComponent} from './invoice/lines/outputline/outputline.component';
import {SubtotalComponent} from './invoice/lines/sub-total/subtotal.component';
import {StepperComponent} from './invoice/stepper/stepper.component';
import {TaxeComponent} from './invoice/taxe/taxe.component';
import {BonReceptionComponent} from './outgoing-invoice/bon-reception/bon-reception.component';
import {CommandeFournisseurComponent} from './outgoing-invoice/commande-fournisseur/commande-fournisseur.component';
import {FactureFournisseurComponent} from './outgoing-invoice/facture-fournisseur/facture-fournisseur.component';
import {OutgoingInvoiceComponent} from './outgoing-invoice/outgoing-invoice.component';
import {Modele1Component} from "./invoice/modele/modele1/modele1.component";
import { NgxPrintModule } from 'ngx-print';
import {Modele2Component} from "./invoice/modele/modele2/modele2.component";

@NgModule({
  declarations: [IncomingInvoiceComponent, OutgoingInvoiceComponent, InvoiceComponent,
    DateComponent, TaxeComponent , StepperComponent, OutputlineComponent, CommentComponent, SubtotalComponent,
    CommandeFournisseurComponent, BonReceptionComponent, FactureFournisseurComponent, DeviseComponent, Modele1Component, Modele2Component],
  imports: [
    CommonModule,
    IncomingInvoiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    DragDropModule,
    CKEditorModule,

        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatIconModule,
        MatInputModule,

        MatTabsModule,
        NgMultiSelectDropDownModule,
        MatAutocompleteModule,
        MatSelectModule,
        DashFournisseurModule,

    // ediotrtext
    NgxPrintModule,

    AngularEditorModule,
    HttpClientModule,
    NgSelectModule,
    ColorPickerModule,
    DataTablesModule,
    SharedModule
  ],
  providers: [StepperService],
  exports: [
    StepperComponent,
    InvoiceComponent,
    OutputlineComponent,
    CommentComponent,
    SubtotalComponent,
    DateComponent,
    TaxeComponent,
    DeviseComponent,
    Modele1Component,
    Modele2Component
  ]
})
export class IncomingInvoiceModule {
}
