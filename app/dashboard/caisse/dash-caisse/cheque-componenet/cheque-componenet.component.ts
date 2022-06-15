import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ChequeRequestForm} from '../../../../shared/model/request-payload/caisse/cheque-request-form';
import {ChequeResult} from '../../../../shared/model/response-payload/caisse/cheque-result';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'wind-cheque-componenet',
  templateUrl: './cheque-componenet.component.html',
  styleUrls: ['./cheque-componenet.component.scss']
})
export class ChequeComponenetComponent implements OnInit {
  chequesList: Array<ChequeResult> = [];
  comptelist = [];
  paymentlist = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  selectedtype: any;
  dateSent: any;
  chequForm: ChequeRequestForm = new ChequeRequestForm(
    {value:  moment().toDate(), dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
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
    this.caisseservice.getAllCheques().subscribe(response =>
      this.chequesList = response);

    this.caisseservice.getAllComptes().subscribe(response => {
      this.comptelist = response;
      this.dtTrigger.next();
    });

    this.caisseservice.getAllPaiements().subscribe(response =>
      this.paymentlist = response);
   }
  onAddchequeFormSubmit() {
    console.log('hello');
    this.caisseservice.parametersAddcheque = this.chequForm;
    this.caisseservice.addcheque().subscribe(() => {
    });
  }
  getselectedcompteorigin(event: any) {
    this.selectedtype = event.target.value;
    this.chequForm.compte.value = this.selectedtype;
    console.log(this.selectedtype);
  }

  getselectedpayment(event: any) {
    this.selectedtype = event.target.value;
    this.chequForm.ecriture.value = this.selectedtype;
    console.log(this.selectedtype);
  }
  updateList(id: number, property: string, event: any) {
  }
  remove(uuid: any) {
    this.caisseservice.deletecheque(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  add() {}
  changeValue(id: number, property: string, event: any) {
  }
}
