
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';
import {FournisseurResult} from '../../../../shared/model/response-payload/fournisseur/fournisseur-result';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {PayrollService} from '../../../../shared/services/back-end/payroll/payroll.service';
import {MatStepper} from "@angular/material/stepper";
import {AuthService} from "../../../../shared/services/back-end/auth/auth.service";
import {CollaboratorService} from "../../../../shared/services/back-end/collaborator/collaborator.service";
import {PartnerService} from "../../../../shared/services/back-end/partner/partner.service";
import {PartnerModel} from "../../../../shared/model/response-payload/partner/PartnerModel";

export class Product {
  id: number
  productname: any;
  tva: any;
  quantite: any;
  prixunitaire: any;
  prixtotal: any;
  totalnet: any;



  constructor(id: number, productname: any, tva: any, quantite: any, prixunitaire: any, prixtotal: any, totalnet: any) {
    this.id = id;
    this.productname = productname;
    this.tva = tva;
    this.quantite = quantite;
    this.prixunitaire = prixunitaire;
    this.prixtotal = prixtotal;
    this.totalnet = totalnet;
  }
}

export class Products {
  public productlist: Array<Product>;
  constructor() {
    this.productlist = [];
  }
}

@Component({

  selector: 'wind-Incoming-Invoice',
  templateUrl: './incoming-invoice.component.html',
  styleUrls: ['incoming-invoice.component.css', '../../../../../assets/css/mystyle.css'],
  styles: [
    ` ::ng-deep .multiselect-dropdown .dropdown-btn {
          border: 0px solid #adadad !important;
          padding: 0px !important;
      }
    `
  ]
})
export class IncomingInvoiceComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  url: string | ArrayBuffer = '';
  isLinear = true;
  Personnelpicture: any;
  dateTime: any;
  fournisseurAddressList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  fournisseurRibList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  editField: string;
  show = false;
  showinfofournisseur = false;
  showadd = true;
  showremove = false;
  showremoveen = false;
  facturenumber: any;

  total = 0;
  tva: any;
  idline = 0;
  quantite = 0;
  word: any;
  totalLetter: any;
  coll: any = [];
  closeDropdownSelection = true;
  dropdownSettings: any = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    closeDropDownOnSelection: this.closeDropdownSelection
  };

  product = new Product(0, '' , 0 , 0 , 0 , 0 , 0);
  products: Array<any> = [ new Product(0, '' , 0 , 0 , 0 , 0 , 0)];
  productsen: Array<any> = [ new Product(0, '' , 0 , 0 , 0 , 0 , 0)];
  //important
  TotalHT = 0;
  TotalTTC = 0;

  prd: Product;


  uuidtier: any;
  //etape1
  nomfournisseur = '';
  codefournisseur = '';
  fournisseursList: Array<any>;
  codefournisseurList  = [];
  arrTypeAchat = ['Produit', 'Service'];
  typeAchatList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  filteredfournisseurList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  filteredcodefournisseurList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  type = '';

  eventfournisseurselect = 0;
  eventfournisseurrib = 0;

  fournisseur: any = {};

  //champ de facture
  Addressfacture: any;
  clientfacture: any;

  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;
  myControl = new FormControl();
  checkboxValue = false;
  SelectAddress: any;
  patternResult: PartnerModel ;
  SelectRIB: any;
  alertshow: boolean;
  tenant: any;
  //etape1


  translate = 'fr';
  languetext: any;
  translatearabe = false;
  translatefrancais = true;
  translateanglais = false;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private fournisseurService: FournisseurService,
    private payrollService: PayrollService,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private sirhService: CollaboratorService,
    private partnerservice: PartnerService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    /*_______________Get Tenant________________*/

    if (this.sirhService.uuid != null) {
      this.tenant = this.sirhService.uuid.tenant_id;
      this.partnerservice.getPartner().subscribe(response => {
        this.patternResult = response;
        this.ref.detectChanges();
      });
    }
    /*________________________________________*/

    this.languetext = 'Sélectionner la langue de facture';

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      // testselect: ['', Validators.required],
    });

    this.Addressfacture = 'adresse';
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const moth = new Date().getMonth();
    this.dateTime = day + '/' + moth + '/' + year;
    this.show = false;

    if (( this.eventfournisseurselect === 0 ) && ( this.eventfournisseurrib === 0)) {
      this.showinfofournisseur = false;
    }

  }

  toggle() {

    this.show = !this.show;
  }
  langue(item: any) {
    if ( item === 'fr') {
      this.languetext = 'Francais';
      this.translate = 'fr';

      this.translatefrancais = true;
      this.translateanglais = false;
      this.translatearabe = false;

    } else if ( item === 'en') {
      this.languetext = 'English';

      this.translatefrancais = false;
      this.translateanglais = true;
      this.translatearabe = false;
    } else if ( item === 'ar') {
      this.languetext = 'العربية';

      this.translatefrancais = false;
      this.translateanglais = false;
      this.translatearabe = true;
    } else {
      this.languetext = 'Sélectionner la langue de facture';
      this.translatefrancais = true;
    }
  }
  adressedelect() {
    const coll =  [];
    this.fournisseurService.gettiers(this.uuidtier).subscribe(tiersresponse => {
      tiersresponse.tiers_address.forEach(eltadress => {

        const adresstext = eltadress.location;
        coll.push({ item_id: eltadress.uuid, item_text: adresstext  });
        this.fournisseurAddressList.next(coll);
      });
    });


  }
  ribselect() {
    const coll =  [];
    this.fournisseurService.gettiers(this.uuidtier).subscribe(tiersresponse => {
      tiersresponse.tiers_Bank_Accounts.forEach(eltrib => {

        const ribtext = eltrib.account_Number;
        coll.push({ item_id: eltrib.uuid, item_text: ribtext  });
        this.fournisseurRibList.next(coll);
      });
    });

  }
  onItemSelectAddress(item: any) {
    console.log('onItemSelect', item);
    this.SelectAddress = item;
    const a = this.coll.list;
  }
  onItemDeSelectAddress(item: any) {
    this.SelectAddress = undefined;
    console.log('onItemDeSelect', item);
  }
  onItemSelectRib(item: any) {
    this.SelectRIB = item;
    console.log('onItemSelect', item);
    const a = this.coll.list;
  }
  onItemDeSelectRib(item: any) {
    this.SelectRIB = undefined;
    console.log('onItemDeSelect', item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  onDeSelectAll(items: any) {
    console.log(items); // items is an empty array
  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {closeDropDownOnSelection: this.closeDropdownSelection});
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }



  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.Personnelpicture = event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
      };
    }
  }

  /****__tableau function___***/

  calcultotal(id: number, property: string, event: any) {
    this.TotalHT = 0;
    this.TotalTTC = 0;
    const editField = event.target.value;
    if (property === 'quantite') {
      this.products[id].quantite = editField;
    }
    if (property === 'prixunitaire') {
      this.products[id].prixunitaire = editField;
    }
    if (property === 'tva') {
      this.products[id].tva = editField;
    }

    this.total = Number((this.products[id].quantite *  this.products[id].prixunitaire).toFixed(3));
    this.tva =  Number(((this.total * this.products[id].tva) / 100).toFixed(3));

    this.products[id].prixtotal = Number(this.total.toFixed(3));
    this.products[id].totalnet = Number((this.total + this.tva).toFixed(3));

    this.products.forEach(elt => {
      this.TotalHT = Number((this.TotalHT + elt.prixtotal).toFixed(3));
      this.TotalTTC = Number((this.TotalTTC + elt.totalnet).toFixed(3));
      // add 0.600
      this.word = Number((this.TotalTTC + 0.6).toFixed(3));
    });

    //  this.word = Number((this.TotalTTC + 0.6).toFixed(3));

    const wordtnd = this.word.toString().split('.')[0];
    const wordmil = this.word.toString().split('.')[1];

    const writtenNumber = require('written-number');

    const wordentnd = writtenNumber(wordtnd, {lang: 'fr'}); // => 'mille deux cent trente-quatre'
    const wordenmil = writtenNumber(wordmil, {lang: 'fr'}); // => 'mille deux cent trente-quatre'

    const wordentnd_en = writtenNumber(wordtnd);
    const wordenmil_en = writtenNumber(wordmil);

    const wordentnd_ar = writtenNumber(wordtnd, {lang: 'ar'}); // => 'mille deux cent trente-quatre'
    const wordenmil_ar = writtenNumber(wordmil, {lang: 'ar'}); // => 'mille deux cent trente-quatre'

    if ( this.translatearabe === true ) {
      this.totalLetter = wordentnd_ar + ' دينار و ' + wordenmil_ar + ' مليم';
    }
    if ( this.translatefrancais === true ) {
      this.totalLetter = wordentnd + ' dinars et ' + wordenmil + ' millims';
    }
    if ( this.translateanglais === true ) {
      this.totalLetter = wordentnd_en + ' dinars and  ' + wordenmil_en + ' millime';
    }



    // const words = writtenNumber(this.word); // => 'one thousand two hundred and thirty-four'
    // const wordsfr = writtenNumber(this.word, {lang: 'fr'});   // => 'mille deux cent trente-quatre'
    // const wordg = writtenNumber(this.word, {lang: 'ar'});   // => 'ألف ومائتان وأربعة وثلاثون'
  }
  print() {

    let printContents; let  popupWin;
    printContents = document.getElementById('print').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>

.customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.customers td, .customers th {
  border: 1px solid #ddd;
  padding: 8px;
}


.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #2270ba;
  color: white;}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  appendline(id: number) {
    this.showremove = true;

    this.prd = new Product(id, '' , 0 , 0 , 0 , 0 , 0);
    this.products.push(this.prd);

    this.ref.detectChanges();
  }
  suppline() {
    const lenth = this.products.length;
    const prixtotalsplit =  Number((this.products[lenth - 1].prixtotal).toFixed(3));
    const totalnetsplit =  Number((this.products[lenth - 1].totalnet).toFixed(3));

    const wordnew = Number((this.word - totalnetsplit).toFixed(3)) ;
    const TotalHTnew = Number((this.TotalHT - prixtotalsplit).toFixed(3)) ;

    if (lenth === 2) {
      this.showremove = false;
      this.word =  Number((wordnew).toFixed(3)) ;
      this.TotalHT =  Number((TotalHTnew).toFixed(3)) ;
    }
    if (lenth > 1) {
      this.products.splice(-1, 1);
      this.word =  Number((wordnew).toFixed(3)) ;
      this.TotalHT =  Number((TotalHTnew).toFixed(3)) ;
    }

    const wordtnd = this.word.toString().split('.')[0];
    const wordmil = this.word.toString().split('.')[1];

    const writtenNumber = require('written-number');
    const wordentnd = writtenNumber(wordtnd, {lang: 'fr'}); // => 'mille deux cent trente-quatre'
    const wordenmil = writtenNumber(wordmil, {lang: 'fr'}); // => 'mille deux cent trente-quatre'

    this.totalLetter = wordentnd + ' dinars et ' + wordenmil + ' millims';
  }
  supplineen() {
    const lenth = this.products.length;
    const prixtotalsplit =  Number((this.products[lenth - 1].prixtotal).toFixed(3));
    const totalnetsplit =  Number((this.products[lenth - 1].totalnet).toFixed(3));

    const wordnew = Number((this.word - totalnetsplit).toFixed(3)) ;
    const TotalHTnew = Number((this.TotalHT - prixtotalsplit).toFixed(3)) ;

    if (lenth === 2) {
      this.showremoveen = false;
      this.word =  Number((wordnew).toFixed(3)) ;
      this.TotalHT =  Number((TotalHTnew).toFixed(3)) ;
    }
    if (lenth > 1) {
      this.products.splice(-1, 1);
      this.word =  Number((wordnew).toFixed(3)) ;
      this.TotalHT =  Number((TotalHTnew).toFixed(3)) ;
    }

    const wordtnd = this.word.toString().split('.')[0];
    const wordmil = this.word.toString().split('.')[1];

    const writtenNumber = require('written-number');
    const wordentnd = writtenNumber(wordtnd, {lang: 'fr'}); // => 'mille deux cent trente-quatre'
    const wordenmil = writtenNumber(wordmil, {lang: 'fr'}); // => 'mille deux cent trente-quatre'

    this.totalLetter = wordentnd + ' dinars et ' + wordenmil + ' millims';
  }

  gettvacheck(ischeck: any) {
    this.checkboxValue = ischeck;
  }

  //etape 1: fournisseur
  _filter(event1) {
    const event = this.nomfournisseur;

    this.fournisseursList = [];
    this.filteredfournisseurList.next([]);
    if (event.length >= 3) {
      this.eventfournisseurselect = 3;
      this.fournisseurService.getfiltredtiers(event).subscribe(rep => {
        if (rep.length === 0 ) {
          this.nomfournisseur = '';
          this.codefournisseur = '';
          document.querySelector('.newfournisseur').classList.add('show');
        } else {
          rep.forEach(elt => {
            this.fournisseursList.push(elt);
          });
          document.querySelector('.newfournisseur').classList.remove('show');
          this.filteredfournisseurList.next(this.fournisseursList);
        }
      });
    } else {
      this.eventfournisseurselect = 0;
    }

    // if (( this.eventfournisseurselect === 0 ) && ( this.eventfournisseurrib === 0)) {
    //   this.showinfofournisseur = false;
    // }
  }
  _filter2(event2) {
    const event = this.codefournisseur;
    this.codefournisseurList = [];
    this.fournisseurService.getfiltredtiersbyCode(event).subscribe(rep => {
      if (rep.length === 0 ) {
        this.codefournisseur = '';
        this.nomfournisseur = '';
      } else {
        rep.forEach(elt => {
          this.codefournisseurList.push(elt);
        });
        this.filteredcodefournisseurList.next(this.codefournisseurList);
      }
    });

  }
  _filterbyType(event3) {
    const event = this.type;
    this.typeAchatList.next(this.arrTypeAchat.filter(option =>
      option.toLowerCase().indexOf(event) === 0));
  }

  close() {
    this.autoComplete.closePanel();
  }

  addFournisseur(content) {
    this.modalService.open(content,  {size: 'xl'});
  }

  select() {
    this.showinfofournisseur = false;
    const coll =  [];
    const code = [];
    const firstcaracter = this.nomfournisseur.substr(0, 2 );
    this.fournisseursList.forEach(elt => {
      if (elt.name === this.nomfournisseur) {
        this.clientfacture = elt.name;
        this.uuidtier = elt.uuid;
        (document.getElementById('code') as HTMLInputElement).value = elt.code;

        elt.tiers_address.forEach(eltadress => {
          const adresstext = eltadress.city;
          coll.push({ item_id: eltadress.uuid, item_text: adresstext  });

        });
        elt.tiers_Bank_Accounts.forEach(eltadress => {
          const ribtext = eltadress.account_Number;
          code.push({ item_id: elt.uuid, item_text: ribtext  });
        });

        // coll.push({ item_id: '0', item_text: 'Ajouter Nouvelle adresse'  });
        // code.push({ item_id: '0', item_text: 'Ajouter Nouveau RIB'  });
        this.fournisseurAddressList.next(coll);
        this.fournisseurRibList.next(code);
        this.ref.detectChanges();
      }
      this.showinfofournisseur = true;
    });
    this.filteredfournisseurList.next([]);
    // get facture number

    this.payrollService.getFactureNumber(firstcaracter).subscribe(response => {
        this.facturenumber = response.billing_number;
        this.ref.detectChanges();
      }
    );
  }

  selectCode() {

    this.showinfofournisseur = false;
    const coll =  [];
    const code = [];
    const a = this.codefournisseur;
    this.codefournisseurList.forEach(elt => {
      if (elt.code === a) {
        (document.getElementById('name') as HTMLInputElement).value = elt.name;
        this.fournisseur = elt;

        elt.tiers_address.forEach(eltadress => {
          const adresstext = eltadress.city;
          coll.push({ item_id: elt.uuid, item_text: adresstext  });

        });
        elt.tiers_Bank_Accounts.forEach(eltadress => {
          const ribtext = eltadress.account_Number;
          code.push({ item_id: elt.uuid, item_text: ribtext  });
        });

        // coll.push({ item_id: '0', item_text: 'Ajouter Nouvelle adresse'  });
        // code.push({ item_id: '0', item_text: 'Ajouter Nouveau RIB'  });
        this.fournisseurAddressList.next(coll);
        this.fournisseurRibList.next(code);
      }
    });
    this.showinfofournisseur = true;
    this.filteredcodefournisseurList.next([]);
  }

  defaultSelect() {

    if (this.codefournisseurList[0].code !== this.codefournisseur) {
      (document.getElementById('code') as HTMLInputElement).value = '';
      (document.getElementById('name') as HTMLInputElement).value = '';
      this.filteredcodefournisseurList.next([]);
    } else {
      (document.getElementById('name') as HTMLInputElement).value = this.codefournisseurList[0].name;
    }

  }


  reloadrules(content) {
    this.modalService.dismissAll(content);
  }

  open(content) {
    this.modalService.open(content, {size: 'xxl'});
  }




  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    if ((this.SelectAddress !== undefined) && (this.SelectRIB !== undefined)) {
      this.alertshow = false;
      this.Addressfacture = this.SelectAddress.item_text;
      stepper.next();
    } else {
      this.alertshow = true;
    }
  }
}
