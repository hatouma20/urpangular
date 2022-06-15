import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {PaymentChoiceEnum} from '../../../../shared/model/enum-type/Caisse/payment-choice-enum';
import {PaiementRequestForm} from '../../../../shared/model/request-payload/caisse/paiement-form';
import {PaiementResult} from '../../../../shared/model/response-payload/caisse/paiement-result';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'wind-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.scss']
})
export class AddPaiementComponent implements OnInit {
  selected: any;
  selectedtype: any;
  comptelist = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  paiementList: Array<PaiementResult> = [];
  dateSent: any;
  typecomptes = PaymentChoiceEnum;
  keytypecomptes = [];
  payForm: PaiementRequestForm = new PaiementRequestForm(
    {value:  moment().toDate(), dirty: false, class: '', error: ''},
    {value:  moment().toDate(), dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
     {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
     true
  );
  constructor(private caisseservice: CaisseService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.keytypecomptes = Object.keys(this.typecomptes).filter(k => !isNaN(Number(k)));
    this.dateSent = moment().toDate();
    this.caisseservice.getAllPaiements().subscribe(response =>{
      this.paiementList = response;
      this.dtTrigger.next();
    });
    this.caisseservice.getAllComptes().subscribe(response =>
      this.comptelist = response);
  }
  getselectedsens(event: any) {
    this.selected = event.target.value;
    this.payForm.sens.value = this.selected;
  }
  getselectedcompteorigin(event: any) {
    this.selectedtype = event.target.value;
    this.payForm.bankAccount.value = this.selectedtype;
    console.log(this.selectedtype);
  }
  getselectedtypepayment(event: any) {
    this.selected = event.target.value;
    this.payForm.paymentMode.value = this.typecomptes[this.selected];
  }
  onAddpaiementFormSubmit() {
    console.log('hello');
    this.caisseservice.parametersAddPaiement = this.payForm;
    this.caisseservice.addpaiemet().subscribe(() => {
    });
  }
  updateList(id: number, property: string, event: any) {
  }
  remove(uuid: any) {
    this.caisseservice.deletepaiement(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  add() {}
  changeValue(id: number, property: string, event: any) {
  }
}
