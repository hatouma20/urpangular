import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WindFormElement} from '../../../../shared/model/windForm';
import {WindForm} from '../../../../shared/model/windForm';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';

@Component({
  selector: 'wind-fournisseur-profile',
  templateUrl: './fournisseur-profile.component.html',
  styleUrls: ['./fournisseur-profile.component.scss']
})
export class FournisseurProfileComponent implements OnInit {
  adresssesList: Array<any> = [
    {
      tiers:		{
        uuid	:	'63e484ad-a8e8-4dfe-90d5-8db848c27b'
      },
      uuid	:	'63e484ad-a8e8-4dfe-90d5-8db848c27b',
      name	:	'WEGA TRAVEL',
      firstname	:	'abdelhak',
      civility	:	'sdf',
      ownerfunction	:	'fddd',
      address	:	'sfd',
      zipCode	:	'dsf',
      city	:	'Bekalta',
      department	:	'dsdsds',
      profPhone	:	78452,
      mobile	:	421,
      fax	:	5412,
      email	:	'karimkhouja@gmail.com',
      isdefault	:	true
    },
    {
      tiers:		{
        uuid	:	'63e484ad-a8e8-4dfe-90d5-8db848c27b'
      },
      uuid	:	'63e484ad-a8e8-4dfe-90d5-8db848c27b',
      name	:	'Wind',
      firstname	:	'Farhat',
      civility	:	'sdf',
      ownerfunction	:	'test function',
      address	:	'immeuble ben',
      zipCode	:	'5093',
      city	:	'Sousse',
      department	:	'developement',
      profPhone	: 12378452,
      mobile	:	421248512,
      fax	:	73695412,
      email	:	'karimkhouja14hf@gmail.com',
      isdefault	:	true
    }
  ];
  form: WindForm = new WindForm([
    new WindFormElement('rc', '', 'text', [Validators.required, Validators.min(4)], 'rc'),
    new WindFormElement('name', '', 'text', [Validators.required, Validators.min(4)], 'name'),
    new WindFormElement('alternative_Name', '', 'text', [Validators.required, Validators.min(4)], 'alternative_Name'),
    new WindFormElement('nature', '', 'text', [Validators.required, Validators.min(4)], 'nature'),
    new WindFormElement('code', '', 'text', [Validators.required, Validators.min(4)], 'code'),
    new WindFormElement('state', '', 'text', [Validators.required, Validators.min(4)], 'state'),
    new WindFormElement('address', '', 'text', [Validators.required, Validators.min(4)], 'address'),
    new WindFormElement('zipCode', '', 'text', [Validators.required, Validators.min(4)], 'zipCode'),
    new WindFormElement('country', '', 'text', [Validators.required, Validators.min(4)], 'country'),
    new WindFormElement('city', '', 'text', [Validators.required, Validators.min(4)], 'city'),
    new WindFormElement('phone', '', 'text', [Validators.required, Validators.min(4)], 'phone'),
    new WindFormElement('fax', '', 'text', [Validators.required, Validators.min(4)], 'fax'),
    new WindFormElement('email', '', 'text', [Validators.required, Validators.min(4)], 'email'),
    new WindFormElement('web', '', 'text', [Validators.required, Validators.min(4)], 'web'),
    new WindFormElement('tax_Registration', '', 'text', [Validators.required, Validators.min(4)], 'tax_Registration'),
    new WindFormElement('endouane_Code', '', 'text', [Validators.required, Validators.min(4)], 'endouane_Code'),
    new WindFormElement('ban', '', 'text', [Validators.required, Validators.min(4)], 'ban'),
    new WindFormElement('vat_Liable', '', 'text', [Validators.required, Validators.min(4)], 'vat_Liable'),
    new WindFormElement('vat_Number', '', 'text', [Validators.required, Validators.min(4)], 'vat_Number'),
    new WindFormElement('vat_End_Date', '', 'text', [Validators.required, Validators.min(4)], 'vat_End_Date'),
    new WindFormElement('vat_Start_Date', '', 'text', [Validators.required, Validators.min(4)], 'vat_Start_Date'),
    new WindFormElement('tiers_Type', '', 'text', [Validators.required, Validators.min(4)], 'tiers_Type'),
    new WindFormElement('employee', '', 'text', [Validators.required, Validators.min(4)], 'employee'),
    new WindFormElement('type_LegEnt', '', 'text', [Validators.required, Validators.min(4)], 'type_LegEnt'),
    new WindFormElement('visibility', '', 'text', [Validators.required, Validators.min(4)], 'visibility'),


    new WindFormElement('logo', '', 'text', [Validators.required, Validators.min(4)], 'logo'),
    new WindFormElement('departement', '', 'text', [Validators.required, Validators.min(4)], 'departement'),
    new WindFormElement('capital', '', 'text', [Validators.required, Validators.min(4)], 'capital'),
    new WindFormElement('commercial', '', 'text', [Validators.required, Validators.min(4)], 'commercial'),
  ]);
  fournisseurResult: any;
  url: string | ArrayBuffer = '';
   personList: Array<any> = [
    {id: 1, typecontrat: 'Contrat à durée indéterminée', datedebut: '01/01/2016', datefin: '', datefinPE: '30/04/2017', datesortie: ''},
  ];

  constructor(private router: Router,
              private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
     this.fournisseurResult = this.fournisseurService.fournisseuraddresult;
  }
  onAddfournisseur() {
  this.router.navigateByUrl('/dashboard/fournisseur/fournisseur');
   }
  updateList(id: number, property: string, event: any) {
  }

  changeValue(id: number, property: string, event: any) {
  }

  remove(uuid: any) {
    this.fournisseurService.deleteadresse(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  removecompte(uuid: any) {
    this.fournisseurService.deleteaccount(uuid).subscribe(response =>
      window.location.reload()
    );
  }

  add(uuid: any) {
    this.fournisseurService.uuidfournisseur = uuid;
    this.router.navigateByUrl('/dashboard/fournisseur/fournisseur/adresse');
  }
  addcompte(uuid: any) {
    this.fournisseurService.uuidfournisseur = uuid;
    this.router.navigateByUrl('/dashboard/fournisseur/fournisseur/bankaccount');
  }

}
