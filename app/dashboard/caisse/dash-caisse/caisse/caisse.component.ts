import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import {ChequeResult} from '../../../../shared/model/response-payload/caisse/cheque-result';
import {PaiementResult} from '../../../../shared/model/response-payload/caisse/paiement-result';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'wind-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  compteResult: any;
  paiementList: Array<PaiementResult> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  chequesList: Array<ChequeResult> = [];
  dtTrigger2: Subject<any> = new Subject<any>();
  form: WindForm = new WindForm([
    new WindFormElement('ref', '', 'text', [Validators.required, Validators.min(4)], 'ref'),
    new WindFormElement('label', '', 'text', [Validators.required, Validators.min(4)], 'label'),
    new WindFormElement('currency', '', 'text', [Validators.required, Validators.min(4)], 'currency'),
    new WindFormElement('bank_name', '', 'text', [Validators.required, Validators.min(4)], 'bank_name')
  ]);

  constructor(private caisseservice: CaisseService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.compteResult = this.caisseservice.compteresult;
    this.caisseservice.getAllPaiements().subscribe(response => {
      this.paiementList = response;
      this.dtTrigger.next();
    });
    this.caisseservice.getAllCheques().subscribe(response => {
      this.chequesList = response;
      this.dtTrigger2.next();
    });
  }
  updateList(id: number, property: string, event: any) {
  }
  remove(uuid: any) {
  }
  add() {}
  changeValue(id: number, property: string, event: any) {
  }

}
