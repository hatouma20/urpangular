import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatStepper} from '@angular/material/stepper';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';
import {groupBy} from "rxjs/operators";
import {Line} from "tslint/lib/verify/lines";
import {ClientModel} from "../../../../../shared/model/response-payload/invoice/client.model";
import {LineModel} from "../../../../../shared/model/response-payload/invoice/line.model";
import {PartnerModel} from '../../../../../shared/model/response-payload/partner/PartnerModel';
import {AuthService} from '../../../../../shared/services/back-end/auth/auth.service';
import {BuillingService} from "../../../../../shared/services/back-end/builling/builling.service";
import {CollaboratorService} from "../../../../../shared/services/back-end/collaborator/collaborator.service";
import {FournisseurService} from '../../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {PartnerService} from "../../../../../shared/services/back-end/partner/partner.service";
import {PayrollService} from '../../../../../shared/services/back-end/payroll/payroll.service';
import {Product} from "../../incoming-invoice/incoming-invoice.component";
import {Modele1Component} from "../modele/modele1/modele1.component";
import {PartnerRibModel} from "../../../../../shared/model/response-payload/partner/RibPartnerModel";
import {PartnerAddressModel} from "../../../../../shared/model/response-payload/partner/AddressPartnerModel";
import {Modele2Component} from "../modele/modele2/modele2.component";
import {LanguageService} from "../../../../../shared/services/back-end/language/language.service";
import {Language} from "../../../../../shared/model/language";
import {LANGUAGE_ARRAY} from "../../../../../fake/data/languages";
import {URL_FILE} from "../../../../../shared/model/config/configUrlImage";

@Component({

  selector: 'wind-client',
  templateUrl: './stepper.component.html',
  styleUrls: ['stepper.component.css'],
  styles: [
    ` ::ng-deep .multiselect-dropdown .dropdown-btn {
          border: 0px solid #adadad !important;
          padding: 0px !important;
      }
    `
  ]
})

export class StepperComponent implements OnInit {
  dateFrom =  '';
  dateFromlivraison =  '';
  dateFromeche =  '';
  htmlContent = '';
  deviseInvoice = '';
  colorInvoice = '#2270ba';
  selectedCityName: any;

  idInvoice: any;
  uuidInvoice = '';
  invoiceAction = 'CREATE';
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

  color: any;

  ValidationInvoiceInputNextStepper = false;

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

  product = new Product(0, '', 0, 0, 0, 0, 0);
  products: Array<any> = [new Product(0, '', 0, 0, 0, 0, 0)];
  productsen: Array<any> = [new Product(0, '', 0, 0, 0, 0, 0)];
  // important
  TotalHT = 0;
  TotalTTC = 0;

  prd: Product;


  uuidtier: any;
  clientModel: ClientModel = new ClientModel('', '', '', '', '', '', '', '');
  // etape1
  nomfournisseur = '';
  codefournisseur = '';
  fournisseursList: Array<any>;
  codefournisseurList = [];
  arrTypeAchat = [
    { code: 'PR',
      label: 'PRODUIT'
    },
    {
      code: 'SR',
      label: 'SERVICE'
    }
    ];
  typeAchatList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  filteredfournisseurList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  filteredcodefournisseurList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  type = '';

  eventfournisseurselect = 0;
  eventfournisseurrib = 0;

  fournisseur: any = {};

  // champ de facture
  Addressfacture: any;
  clientfacture: any;



  @ViewChild(Modele1Component) child: Modele1Component;
  @ViewChild(Modele2Component) childmodele2: Modele2Component;
  @ViewChild('autoCompleteInput', {read: MatAutocompleteTrigger}) autoComplete: MatAutocompleteTrigger;
  myControl = new FormControl();
  checkboxValue = false;
  SelectAddress: any;
  patternResult: PartnerModel;

  PartnerAddressResult: PartnerAddressModel ;
  partnerAddressList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  PartnerRibResult: PartnerRibModel;
  partnerRibList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  SelectRIB: any;
  alertshow: boolean;
  tenant: any;
  // etape1


  translate = 'fr';
  languetext: any;
  translatearabe = false;
  translatefrancais = true;
  translateanglais = false;

  clientexist: boolean;
  clientselect: any;
  lineexist: boolean;


  outlinelist: any = {id: 0, type: ''};
  subtotallist: any = {};
  commentlist: any = {};

  /* 1: line
  * 2: subtotal
  * 3: comment*/
  facturelist: Array<any> = [];
  linestotallists: Array<any> = [];
  linestotallist: Array<LineModel> = [];
  languageResult: Array<Language> = [];
  lineSubTotal: Array<number> = [];
  linestotal: any;
  firstcaracter: string;

  templatecolor: '';
  templatedevise: string;
  modeleinvoice: number;
  note: '';
  listsubtotal: any;

  isEditable = true;
  invoicetest = 'ok';
   payementype: any;
   partnerDefaulAddress: any;
   partnerDefaulRib: any;
   clientimage: string;
   DefaulRib: any;
   DefaulAddress: any;
   purchaseType: any;
   dateinvoice: any;
   dateLivraison: any;
   dateEchec: any;
   DefaulAddressuuid: any;
   DefaulRibuuid: any;

  public urlline: string = URL_FILE;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private fournisseurService: FournisseurService,
    private buillingService: BuillingService,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private sirhService: CollaboratorService,
    private partnerservice: PartnerService,
    private languageService: LanguageService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.clientexist = false;
    this.lineexist = false;
    this.templatedevise = 'TND';
    this.modeleinvoice = 1;
    const coll = [];
    /*_______________Get Tenant________________*/


    if (this.sirhService.uuid != null) {
      this.tenant = this.sirhService.uuid.tenant_id;
      // get partner
      this.partnerservice.getPartner().subscribe(response => {
        this.patternResult = response;
        this.clientimage = this.urlline + this.patternResult.logo;
        this.ref.detectChanges();
      });
// get address
      this.partnerservice.getPartnerAddress().subscribe(response => {
        this.PartnerAddressResult = response;
        response.forEach(item => {

          if (item.main === true) {
             this.partnerDefaulAddress = item.text;
             this.DefaulAddress = item.text;
             this.DefaulAddressuuid = item.uuid;
          }
          const adresstext = item.text;
          coll.push({item_id: item.uuid, item_text: adresstext});
          this.partnerAddressList.next(coll);
        });
        this.ref.detectChanges();
      });
// get Rib
      this.partnerservice.getPartnerRib().subscribe(response => {
        this.PartnerRibResult = response;
        response.forEach(item => {
          if (item.main === true) {
            this.partnerDefaulRib = item.rib;
            this.DefaulRib = item.rib;
            this.DefaulRibuuid = item.uuid;
          }
          const ribtext = item.rib;
          coll.push({item_id: item.uuid, item_text: ribtext});
          this.partnerRibList.next(coll);
        });
        this.ref.detectChanges();
      });
    }
    /*________________________________________*/
    /*________________GET Language________________________*/
    this.languageService.getLanguageList().subscribe(response => {
      this.languageResult = response;
      console.log(this.languageResult)
      this.ref.detectChanges();
    });
    /*________________________________________*/

    this.languetext = 'Sélectionner la langue de facture';

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      modepayementCtrl: ['', Validators.required],
      // testselect: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


    this.Addressfacture = 'adresse';
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const moth = new Date().getMonth();
    this.dateTime = day + '/' + moth + '/' + year;
    this.show = false;

    if ((this.eventfournisseurselect === 0) && (this.eventfournisseurrib === 0)) {
      this.showinfofournisseur = false;
    }

  }

  toggle() {

    this.show = !this.show;
  }

  langue(item: any) {
    debugger;
    if (item === 'fr') {
      this.languetext = 'Francais';
      this.translate = 'fr';

      this.translatefrancais = true;
      this.translateanglais = false;
      this.translatearabe = false;

    } else if (item === 'en') {
      this.languetext = 'English';

      this.translatefrancais = false;
      this.translateanglais = true;
      this.translatearabe = false;
    } else if (item === 'ar') {
      this.languetext = 'العربية';

      this.translatefrancais = false;
      this.translateanglais = false;
      this.translatearabe = true;
    } else {
      this.languetext = 'Sélectionner la langue de facture';
      this.translatefrancais = true;
    }

    /*
    if (item.key === 'fr') {
      this.languetext = 'Francais';
      this.translate = 'FRANCAIS';

      this.translatefrancais = true;
      this.translateanglais = false;
      this.translatearabe = false;

    } else if (item.key === 'en') {
      this.languetext = 'English';

      this.translatefrancais = false;
      this.translateanglais = true;
      this.translatearabe = false;
    } else if (item.key === 'ar') {
      this.languetext = 'العربية';

      this.translatefrancais = false;
      this.translateanglais = false;
      this.translatearabe = true;
    } else {
      this.languetext = 'Sélectionner la langue de facture';
      this.translatefrancais = true;
    }
     */
     }

  adressedelect() {
    const coll = [];
    this.fournisseurService.gettiers(this.uuidtier).subscribe(tiersresponse => {
      tiersresponse.tiers_address.forEach(eltadress => {

        const adresstext = eltadress.location;
        coll.push({item_id: eltadress.uuid, item_text: adresstext});
        this.fournisseurAddressList.next(coll);
      });
    });


  }
  adressPartnerseelect() {
    const coll = [];
    this.partnerservice.getPartnerAddress().subscribe(response => {
      this.PartnerAddressResult = response;
      response.forEach(item => {
        const adresstext = item.text;
        coll.push({item_id: item.uuid, item_text: adresstext});
        this.partnerAddressList.next(coll);
      });
      this.ref.detectChanges();
    });
     }

  ribPartnerselect() {
    const coll = [];
    this.partnerservice.getPartnerRib().subscribe(response => {
      this.PartnerRibResult = response;
      response.forEach(item => {
        const ribtext = item.rib;
        coll.push({item_id: item.uuid, item_text: ribtext});
        this.partnerRibList.next(coll);
      });
      this.ref.detectChanges();
    });
  }

  ribselect() {
    const coll = [];
    this.fournisseurService.gettiers(this.uuidtier).subscribe(tiersresponse => {
      tiersresponse.tiers_Bank_Accounts.forEach(eltrib => {

        const ribtext = eltrib.account_Number;
        coll.push({item_id: eltrib.uuid, item_text: ribtext});
        this.fournisseurRibList.next(coll);
      });
    });

  }

  onItemSelectAddress(item: any) {
    console.log('onItemSelect', item);
    this.SelectAddress = item;
    const a = this.coll.list;
  }

  onItemSelectPartnerAddress(item: any) {
    console.log('onItemSelectPartnerAddress', item);
    this.DefaulAddressuuid  = item.uuid;
    this.partnerDefaulAddress = item.item_text;

  }
  onItemDeSelectPartnerAddress(item: any) {
    this.partnerDefaulAddress = this.DefaulAddress;
    this.DefaulAddressuuid = this.DefaulAddressuuid
    console.log('onItemDeSelectPartnerAddress', item);
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

  onItemSelectPartnerRib(item: any) {
    this.partnerDefaulRib = item.item_text;
    this.DefaulRibuuid = item.item_id;
    console.log('onItemSelectPartnerRib', item);

  }

  onItemDeSelecPartnertRib(item: any) {
    this.partnerDefaulRib = this.DefaulRib;
    this.DefaulRibuuid = this.DefaulRibuuid
    console.log('onItemDeSelectPartnerRib', item);
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

    this.total = Number((this.products[id].quantite * this.products[id].prixunitaire).toFixed(3));
    this.tva = Number(((this.total * this.products[id].tva) / 100).toFixed(3));

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


    if (this.translatearabe === true) {
      this.totalLetter = wordentnd_ar + ' دينار و ' + wordenmil_ar + ' مليم';
    }
    if (this.translatefrancais === true) {
      this.totalLetter = wordentnd + ' dinars et ' + wordenmil + ' millims';
    }
    if (this.translateanglais === true) {
      this.totalLetter = wordentnd_en + ' dinars and  ' + wordenmil_en + ' millime';
    }


    // const words = writtenNumber(this.word); // => 'one thousand two hundred and thirty-four'
    // const wordsfr = writtenNumber(this.word, {lang: 'fr'});   // => 'mille deux cent trente-quatre'
    // const wordg = writtenNumber(this.word, {lang: 'ar'});   // => 'ألف ومائتان وأربعة وثلاثون'
  }

  appendline(id: number) {
    this.showremove = true;

    this.prd = new Product(id, '', 0, 0, 0, 0, 0);
    this.products.push(this.prd);

    this.ref.detectChanges();
  }

  suppline() {
    const lenth = this.products.length;
    const prixtotalsplit = Number((this.products[lenth - 1].prixtotal).toFixed(3));
    const totalnetsplit = Number((this.products[lenth - 1].totalnet).toFixed(3));

    const wordnew = Number((this.word - totalnetsplit).toFixed(3));
    const TotalHTnew = Number((this.TotalHT - prixtotalsplit).toFixed(3));

    if (lenth === 2) {
      this.showremove = false;
      this.word = Number((wordnew).toFixed(3));
      this.TotalHT = Number((TotalHTnew).toFixed(3));
    }
    if (lenth > 1) {
      this.products.splice(-1, 1);
      this.word = Number((wordnew).toFixed(3));
      this.TotalHT = Number((TotalHTnew).toFixed(3));
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
    const prixtotalsplit = Number((this.products[lenth - 1].prixtotal).toFixed(3));
    const totalnetsplit = Number((this.products[lenth - 1].totalnet).toFixed(3));

    const wordnew = Number((this.word - totalnetsplit).toFixed(3));
    const TotalHTnew = Number((this.TotalHT - prixtotalsplit).toFixed(3));

    if (lenth === 2) {
      this.showremoveen = false;
      this.word = Number((wordnew).toFixed(3));
      this.TotalHT = Number((TotalHTnew).toFixed(3));
    }
    if (lenth > 1) {
      this.products.splice(-1, 1);
      this.word = Number((wordnew).toFixed(3));
      this.TotalHT = Number((TotalHTnew).toFixed(3));
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

  // etape 1: fournisseur
  _filter(event1) {
    const event = this.nomfournisseur;

    this.fournisseursList = [];
    this.filteredfournisseurList.next([]);
    if (event.length >= 3) {
      this.eventfournisseurselect = 3;
      this.fournisseurService.getfiltredtiers(event).subscribe(rep => {
        if (rep.length === 0) {
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
      if (rep.length === 0) {
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
      option.label.toLowerCase().indexOf(event) === 0));
  }

  close() {
    this.autoComplete.closePanel();
  }

  addFournisseur(content) {
    this.modalService.open(content, {size: 'xl'});
  }

  select() {

    this.showinfofournisseur = false;
    const coll = [];
    const code = [];
    this.firstcaracter = (this.nomfournisseur.substr(0, 2)).toUpperCase();
    this.fournisseursList.forEach(elt => {
      if (elt.name === this.nomfournisseur) {
        this.clientselect = elt;
        this.clientfacture = elt.name;
        this.uuidtier = elt.uuid;
        (document.getElementById('code') as HTMLInputElement).value = elt.code;

        elt.tiers_address.forEach(eltadress => {
          const adresstext = eltadress.city;
          coll.push({item_id: eltadress.uuid, item_text: adresstext});

        });
        elt.tiers_Bank_Accounts.forEach(eltadress => {
          const ribtext = eltadress.account_Number;
          code.push({item_id: elt.uuid, item_text: ribtext});
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

    this.buillingService.getFactureNumber().subscribe(response => {
        this.facturenumber = response.number;
        this.ref.detectChanges();
      }
    );
  }

  selectPurchaseType(event: any) {

    const codetype = this.arrTypeAchat.filter(
      item => item.label === event.option.value);
    this.purchaseType = codetype[0].code;
  }

  selectCode() {
    this.showinfofournisseur = false;
    const coll = [];
    const code = [];
    const a = this.codefournisseur;
    this.codefournisseurList.forEach(elt => {
      if (elt.code === a) {
        (document.getElementById('name') as HTMLInputElement).value = elt.name;
        this.fournisseur = elt;

        elt.tiers_address.forEach(eltadress => {
          const adresstext = eltadress.city;
          coll.push({item_id: elt.uuid, item_text: adresstext});

        });
        elt.tiers_Bank_Accounts.forEach(eltadress => {
          const ribtext = eltadress.account_Number;
          code.push({item_id: elt.uuid, item_text: ribtext});
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
  openpopup(content) {
    this.modalService.open(content);
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    if (this.SelectAddress !== undefined) {
      this.alertshow = false;
      this.Addressfacture = this.SelectAddress.item_text;

      // START: Remplissage de model client
      this.Affectclient();
      // END: Remplissage de model client

      stepper.next();
    } else {
      this.alertshow = true;
    }
  }

  Affectclient() {
    this.clientexist = true;
    this.clientModel.email = this.clientselect.email;
    this.clientModel.logo = 'http://ns3012518.ip-149-202-74.eu:8762' + this.clientselect.logo;
    this.clientModel.phonenumber = this.clientselect.phone;
    this.clientModel.mf = this.clientselect.tax_Registration;
    this.clientModel.rc = this.clientselect.rc;
    this.clientModel.name = this.clientfacture;
    this.clientModel.adresse = this.Addressfacture;
    this.clientModel.uuid = this.uuidtier;
  }

  clientexistfct() {
    this.clientexist = false;
  }

/*_____________________________________________________*/
  addline() {
    const id = this.facturelist.length;
    this.linestotallist.push(new LineModel(id , 'line', '', '', '', '', '', '', '' , '', '' ));
    this.facturelist.push({type: 1, id, totalline: ''});
  }


  addsubtotal() {
    const id = this.facturelist.length;
    this.facturelist.push({type: 2, id, totalline: ''});
    this.lineSubTotal.push(this.getIndexOfSubTotalList());
    this.linestotallist.push(new LineModel(id , 'subtotal', '', '', '', '', '', '', '' , '', '' ));
  }
  /*_____________________________________________________*/

  addcomment() {
    let id = this.facturelist.length;
    this.facturelist.push({type: 3, id,  totalline: ''});
    this.linestotallist.push(new LineModel(id , 'commentaire', '', '', '', '', '', '', '' , '', '' ));
  }

  remove(id: any , idline: any) {
    this.facturelist.splice(id, 1);

    this.linestotallist.splice(id, 1);
    console.log('after: ' + this.linestotallist);
    this.getStartFrom(id);
  }

  gettotalline(id: any, event: any) {
    this.linestotal = event;
    this.linestotallists.push({ id , totalline: this.linestotal });

    const lastidlist = this.linestotallists[this.linestotallists.length - 1].id;
    const lasttotallist = this.linestotallists[this.linestotallists.length - 1].totalline;

   // this.linestotallist.push({id: '' , type: 'line', position: lastidlist , totalline: lasttotallist });
  }

  getIndexOfSubTotalList(): number {
    let i = this.facturelist.length - 1;
    for ( ; i > -1; i--) {
      if (this.facturelist[i].type === 2) {
        break;
      }
    }
    return i;
  }

  getIndex(id): number {
    let sumOfNotLine = 0;

    for (let i = 0; i < id; i++) {
      if (this.facturelist[i].type !== 1) {
        sumOfNotLine++;
      }
    }

    return (id - sumOfNotLine );

  }

  getStartFrom(id) {
    let i = 0;
    for (i = id - 1; i > -1; i--) {
      if (this.linestotallist[i].productname === 'subtotal') {
      // if (this.facturelist[i].type === 2) {
        break;
      }
    }

    // return this.getIndex(i + 1);
    return i + 1;
  }


  colorchange(color: any) {
      this.templatecolor = color;
  }
  devisechange(devise: any) {
    this.templatedevise = devise;
  }
  modelechange(modeleinvoice: any) {
    this.modeleinvoice = modeleinvoice;
  }
  notechange(note: any) {
    this.note = note;
  }

  subtotalInfolist(list: any) {
    this.listsubtotal = list;
 }

  getfinallist() {

  }

  gotopreview( stepper: MatStepper) {
    this.ValidationInvoiceInputNextStepper = false;


    if (this.linestotallist.length === 0) {
      this.ValidationInvoiceInputNextStepper = true;
    }
    for (let i = 0; i < this.linestotallist.length ; i++) {
      this.ValidationInvoiceInputNextStepper = false;
      if ( this.linestotallist[i].productname === 'line') {
        if ((this.linestotallist[i].quantite === '') || (this.linestotallist[i].prixunitaire === '') || (this.linestotallist[i].descriptionproduct === '') || ((this.linestotallist[i].quantite === '') && (this.linestotallist[i].prixunitaire === '') && (this.linestotallist[i].descriptionproduct === ''))) {
          this.ValidationInvoiceInputNextStepper = true;

        }
      }
      if ( this.linestotallist[i].productname === 'subtotal') {
        if (this.linestotallist[i].subtotaldesc === '')  {
          this.ValidationInvoiceInputNextStepper = true;

        }
      }
      if ( this.linestotallist[i].productname === 'commentaire') {
        if (this.linestotallist[i].descriptionproduct === '')  {
          this.ValidationInvoiceInputNextStepper = true;

        }
      }
    }
    if ((this.ValidationInvoiceInputNextStepper === false)) {
        this.ValidationInvoiceInputNextStepper = false;
        if (this.modeleinvoice === 1) {
          this.child.changeshowlist();
        } else if (this.modeleinvoice === 2) {
          this.childmodele2.changeshowlist();
          this.childmodele2.getTvaList();
        }


        stepper.next();
    }
  }

  getpayementmode(payementype: any) {

    if (payementype === 'CHQ') {  this.payementype = 'cheque'; }
    if (payementype === 'CRD') {  this.payementype = 'traite'; }
    if (payementype === 'card_crédit') {  this.payementype = 'carte crédit'; }
    if (payementype === 'CSH') {  this.payementype = 'éspèce'; }
    if (payementype === 'VIR') {  this.payementype = 'virement'; }
    if (payementype === '') {  this.payementype = 'virement'; }

  }

  dateInvoicechange(dateinvoice: any) {
      this.dateinvoice = dateinvoice;
  }

  dateLivraisonchange(dateLivraison: any) {
    this.dateLivraison = dateLivraison;
  }

  dateEchecchange(dateEchec: any) {
    this.dateEchec = dateEchec;
  }
}

