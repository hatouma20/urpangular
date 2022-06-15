import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validators} from '@angular/forms';
import {BankAccountRequestForm} from '../../../../shared/model/request-payload/fournisseur/bank-account-form';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';

@Component({
  selector: 'wind-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {
  form: WindForm = new WindForm([
    new WindFormElement('uuidfourn', '', 'text', [Validators.required, Validators.min(4)], 'uuidfourn'),
  ]);
  uuidfourn: string;
  adresssesList: Array<BankAccountRequestForm>;
  bankaccountForm: BankAccountRequestForm = new BankAccountRequestForm(
    {values: {uuid: ''}, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  @Output() valueUpdate = new EventEmitter();
  @Input('uuidtier') uuidtier: any;

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.uuidfourn = this.fournisseurService.uuidfournisseur;
    this.fournisseurService.getAllAccounts().subscribe(response =>
      this.adresssesList = response);
  }
   onAddadressFormSubmit() {
     if ((this.uuidtier != null) && (this.uuidtier !== '')) {
       this.fournisseurService.parametersAddaccountBank = this.bankaccountForm;
       this.fournisseurService.uuidfournisseur = this.uuidtier;
     } else { this.fournisseurService.parametersAddaccountBank = this.bankaccountForm; }
     this.fournisseurService.addaccountbank().subscribe(() => {
     });
  }
}
