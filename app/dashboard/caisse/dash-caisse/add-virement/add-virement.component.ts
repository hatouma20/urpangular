import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {VirementRequestForm} from '../../../../shared/model/request-payload/caisse/virement-request-form';
import {VirementResult} from '../../../../shared/model/response-payload/caisse/virement-result';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
@Component({
  selector: 'wind-add-virement',
  templateUrl: './add-virement.component.html',
  styleUrls: ['./add-virement.component.scss']
})
export class AddVirementComponent implements OnInit {
  values = '';
  value = '';
  keyword = 'account_number';
  totalamount = 0;
  totalvirement = 1;
  fieldArray: Array<any> = [];
  newAttribute: any =  {};
  selectedtype: any;
  comptelist = [];
  dateSent: any;
  virementForm: VirementRequestForm = new VirementRequestForm(
    {value: '', dirty: false, class: '', error: ''},
    {
      values: [
        {
        beneficiaryName: '',
        beneficiaryAccount: '',
        description: '',
        amount: 0,
       }], dirty: false, class: '', error: ''
    },
    {value:  moment().toDate(), dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
     true
  );
  constructor(private caisseservice: CaisseService, private router: Router) {}
  ngOnInit(): void {
    this.dateSent = moment().toDate();
    this.caisseservice.getAllComptes().subscribe(response =>
      this.comptelist = response);
    this.fieldArray.push(this.newAttribute);
  }
  getselectedcompteorigin(event: any) {
    this.selectedtype = event.target.value;
    this.virementForm.compteorigin.value = this.selectedtype;
    console.log(this.selectedtype);
  }

  getselectedcomptbeneficiaire(event: any, i) {
    this.selectedtype = event.target.value;
    this.virementForm.beneficiarys.values[i].beneficiaryAccount = this.selectedtype;
    console.log(this.selectedtype);
  }
  onAddvirementFormSubmit() {
    console.log('hello');
    this.caisseservice.parametersAddVirement = this.virementForm;
    this.caisseservice.addvirement().subscribe(() => {
      this.router.navigateByUrl('/dashboard/caisse/caisse/result');
    });
  }
  addFieldValue(i) {
    if (this.fieldArray.length < 6) {
      this.fieldArray.push(this.newAttribute);
      this.virementForm.beneficiarys.values.push(
        {
          beneficiaryName: '',
          beneficiaryAccount: '',
          description: '',
          amount: 0,
        }
      );
      this.totalvirement = this.totalvirement + 1 ;
    }
    this.newAttribute =  {};
  }
  deleteFieldValue(index, a) {
    this.fieldArray.splice(index, 1);
    this.virementForm.beneficiarys.values.splice(index, 1);
    this.totalvirement = this.totalvirement - 1;
    this.totalamount = this.totalamount - a;
  }
  selectEvent(item, i) {
    // do something with selected item
    this.virementForm.beneficiarys.values[i].beneficiaryAccount = item.uuid;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e) {
    // do something when input is focused
  }
  onEnter(value: string) { this.totalamount = this.totalamount  + parseInt(value, 10)  ; }
}
