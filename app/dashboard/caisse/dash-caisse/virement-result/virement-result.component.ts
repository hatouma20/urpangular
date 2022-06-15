import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import {VirementRequestForm} from '../../../../shared/model/request-payload/caisse/virement-request-form';
import {CompteResult} from '../../../../shared/model/response-payload/caisse/compte-result';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
@Component({
  selector: 'wind-virement-result',
  templateUrl: './virement-result.component.html',
  styleUrls: ['./virement-result.component.scss']
})
export class VirementResultComponent implements OnInit {
  compteresult: CompteResult;
  addedtransfer: VirementRequestForm;
  totalamount = 0;
  totalvirement: number;
  resultnumber: string;
  valuestring: number;
  centaineDecimal: number;
  form: WindForm = new WindForm([
    new WindFormElement('transfernumber', '', 'text', [Validators.required, Validators.min(4)], 'transfernumber'),
    new WindFormElement('compteorigin', '', 'text', [Validators.required, Validators.min(4)], 'compteorigin'),
    new WindFormElement('datevirement', '', 'text', [Validators.required, Validators.min(4)], 'datevirement'),
    new WindFormElement('socialreason', '', 'text', [Validators.required, Validators.min(4)], 'socialreason')
  ]);
  constructor(private caisseservice: CaisseService) { }
  ngOnInit(): void {
    this.addedtransfer = this.caisseservice.parametersAddVirement;
    this.addedtransfer.beneficiarys.values.forEach(item => {
     this.totalamount = this.totalamount  + item.amount;
     });
    this.totalvirement = this.addedtransfer.beneficiarys.values.length;
    this.caisseservice.getwordfromnumber(this.totalamount).subscribe(response =>
      this.resultnumber = response
    );
    }
 }
