import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {FournisseurResult} from '../../../../shared/model/response-payload/fournisseur/fournisseur-result';
import {ContactAdresseRequestForm} from '../../../../shared/model/request-payload/fournisseur/contact-adress-form';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';
@Component({
  selector: 'wind-contactadresse',
  templateUrl: './contactadresse.component.html',
  styleUrls: ['./contactadresse.component.scss']
})
export class ContactadresseComponent implements OnInit {
  adresssesList: Array<ContactAdresseRequestForm>;
   form: WindForm = new WindForm([
     new WindFormElement('uuidfourn', '', 'text', [Validators.required, Validators.min(4)], 'uuidfourn'),
  ]);
  fournisseuraddresult: FournisseurResult;
  uuidfourn: string;
  selected: string;

  @Output() valueUpdate = new EventEmitter();
  @Input('uuidtier') uuidtier: any;

  constructor(private fournisseurService: FournisseurService, private router: Router,
  ) { }
  adressForm: ContactAdresseRequestForm = new ContactAdresseRequestForm(
    {values: {uuid: ''}, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    true
  );
  ngOnInit(): void {
    this.fournisseuraddresult = this.fournisseurService.fournisseuraddresult;
    this.uuidfourn = this.fournisseurService.uuidfournisseur;
    this.adressForm.tiers.values.uuid = this.selected;
    this.fournisseurService.getAllAdresses().subscribe(response =>
      this.adresssesList = response);
  }
  onAddadressFormSubmit() {
    console.log('hello');
    if ((this.uuidtier != null) && (this.uuidtier !== '')) {
      this.fournisseurService.parametersAddadress = this.adressForm;
      this.fournisseurService.uuidfournisseur = this.uuidtier;
    } else { this.fournisseurService.parametersAddadress = this.adressForm; }
    this.fournisseurService.addadresse().subscribe(() => {
     });
  }
   getselectedcivility(event: any) {
    this.selected = event.target.value;
    this.adressForm.civility.value = this.selected;
  }
  getselecteddefault(event: any) {
    this.selected = event.target.value;
    if (this.selected === 'true') { this.adressForm.isdefault.value = true; } else {this.adressForm.isdefault.value = false; }
  }
 }
