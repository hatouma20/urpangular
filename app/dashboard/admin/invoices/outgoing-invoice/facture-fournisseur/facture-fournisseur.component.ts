import {ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material';
import {MatStepper} from '@angular/material/stepper';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject} from 'rxjs';
import {PaymentType} from '../../../../../shared/constants/payment-type';
import {SensTransactions} from '../../../../../shared/constants/sens-transactions';
import {URL_FILE} from '../../../../../shared/model/config/configUrlImage';
import {Language} from '../../../../../shared/model/language';
import {ClientModel} from '../../../../../shared/model/response-payload/invoice/client.model';
import {LineModel} from '../../../../../shared/model/response-payload/invoice/line.model';
import {PaymentModel} from '../../../../../shared/model/response-payload/invoice/payment.model';
import {RetenueSourceModel} from '../../../../../shared/model/response-payload/invoice/retenue-source';
import {TransactionModel} from '../../../../../shared/model/response-payload/invoice/transaction-model';
import {PartnerAddressModel} from '../../../../../shared/model/response-payload/partner/AddressPartnerModel';
import {PartnerModel} from '../../../../../shared/model/response-payload/partner/PartnerModel';
import {PartnerRibModel} from '../../../../../shared/model/response-payload/partner/RibPartnerModel';
import {AuthService} from '../../../../../shared/services/back-end/auth/auth.service';
import {BuillingService} from '../../../../../shared/services/back-end/builling/builling.service';
import {CollaboratorService} from '../../../../../shared/services/back-end/collaborator/collaborator.service';
import {FournisseurService} from '../../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {LanguageService} from '../../../../../shared/services/back-end/language/language.service';
import {PartnerService} from '../../../../../shared/services/back-end/partner/partner.service';
import {PayrollService} from '../../../../../shared/services/back-end/payroll/payroll.service';
import {Product} from '../../incoming-invoice/incoming-invoice.component';
import {Modele1Component} from '../../invoice/modele/modele1/modele1.component';
import {Modele2Component} from '../../invoice/modele/modele2/modele2.component';
declare let jsPDF;

@Component({
  selector: 'facture-fournisseur',
  templateUrl: './facture-fournisseur.component.html',
  styleUrls: ['facture-fournisseur.component.css']
})
export class FactureFournisseurComponent implements OnInit {
   checked = false;
   paymentTypeEnum = PaymentType;
   new_left_to_pay: any;
   oldlefttopay: any;
   new_total: any;
   total_RS = '0';
   left_to_pay_RS = '0';
   unit_RS: any = null;
   RS_model: RetenueSourceModel = new RetenueSourceModel('', null , '', false, null, true, '',  '', '', new Date());
   listTransactionForPayment = [];
   sensTransactions = SensTransactions;
   listTransactionsPayed = [];
   private validationValue: boolean;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private fournisseurService: FournisseurService,
    private buillingService: BuillingService,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private sirhService: CollaboratorService,
    private partnerservice: PartnerService,
    private _formBuilder: FormBuilder,
    private languageService: LanguageService) {
  }
  modeleinvoiceList = [
    {id: 1, name: 'Modele 1', avatar: '../../../../../assets/img/invoice/invoice1.png'},
    {id: 2, name: 'Modele 2', avatar: '../../../../../assets/img/invoice/invoice2.png'}
  ];

  invoiceAction = 'CREATE';
  uuidInvoice = '';
  showMenu = false;
  selectedInvoice: any;
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
  htmlContent = '';
  color: any;
  selectedCityName: any;
  deviseInvoice = '';
  colorInvoice = '#2270ba';
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
  dateFrom =  '';
  dateFromlivraison =  '';
  dateFromeche =  '';
  eventfournisseurselect = 0;
  eventfournisseurrib = 0;

  fournisseur: any = {};

// champ de facture
  Addressfacture: any;
  clientfacture: any;
  public fineshed = new BehaviorSubject(null);


  @ViewChild(Modele1Component) child: Modele1Component;
  @ViewChild(Modele2Component) childmodele2: Modele2Component;
  @ViewChild('autoCompleteInput', {read: MatAutocompleteTrigger}) autoComplete: MatAutocompleteTrigger;
  myControl = new FormControl();
  checkboxValue = false;
  SelectAddress = {
    item_text: '',
    item_id : ''
  };
  DefaulAddress: any;
  purchaseType: any;
  dateinvoice: any;
  dateLivraison: any;
  dateEchec: any;
  patternResult: PartnerModel;
  PartnerAddressResult: PartnerAddressModel ;
  partnerAddressList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  PartnerRibResult: PartnerRibModel;
  partnerRibList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  SelectRIB: any;
  alertshow: boolean;
  tenant: any;
  DefaulAddressuuid: any;
  DefaulRibuuid: any;
  DefaulRib: any;
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
  lineSubTotal: Array<number> = [];
  linestotal: any;
  firstcaracter: string;
  public urlline: string = URL_FILE;
  templatecolor: '';
  templatedevise: string;
  modeleinvoice: number;
  note: string;
  listsubtotal: any;
  languageResult: Array<Language> = [];
  isEditable = true;
  invoicetest = 'ok';
  payementype: any;
  partnerDefaulAddress: any;
  partnerDefaulRib: any;
  clientimage: string;
  allInvoices = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  selectedTier: any;
  selectedAddress: any;
  /*_____________________________________________________*/
  idInvoice: any;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      order: [[13, 'asc']]   // '0' is the table column(1st column) and 'desc' is the sorting order
    };
    this.fineshed.next(false);
    this.buillingService.getAllFactureAchat().subscribe(resp => {
      this.allInvoices = resp;
      this.fineshed.next(true);
    });
    this.fineshed.subscribe(value => {
      if (value) {
        this.allInvoices.forEach((elt, index) => {
          this.fournisseurService.gettiers(elt.customer).subscribe(resp => {
            this.allInvoices[index].customerName = resp.name;
          });
        });
      }
    });
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
        this.dtTrigger.next();
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
      console.log(this.languageResult);
      this.ref.detectChanges();
    });
    /*________________________________________*/

    this.languetext = 'Sélectionner la langue de facture';

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      address: ['', Validators.required],
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
    const selecedAdd = this.coll.find(elt => elt.item_text === item.option.value);
    this.SelectAddress = {
      item_id: selecedAdd.item_id,
      item_text : item.option.value
    };
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
  _filter(event) {
    event = this.nomfournisseur;

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

  filteradressedelect(event) {
    // event = this.SelectAddress.item_text;

    this.fournisseurAddressList.next(this.coll.filter(option =>
      option.item_text.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0));
  }
  close() {
    this.autoComplete.closePanel();
  }

  addFournisseur(content) {
    this.modalService.open(content, {size: 'xl'});
  }

  select() {

    this.showinfofournisseur = false;
    this.coll = [];
    const code = [];
    this.firstcaracter = (this.nomfournisseur.substr(0, 2)).toUpperCase();
    this.fournisseursList.forEach(elt => {
      if (elt.name === this.nomfournisseur) {
        this.clientselect = elt;
        this.clientfacture = elt.name;
        this.uuidtier = elt.uuid;
        (document.getElementById('code') as HTMLInputElement).value = elt.code;

        elt.tiers_address.forEach(eltadress => {
          const adresstext = eltadress.location;
          this.coll.push({item_id: eltadress.uuid, item_text: adresstext});

        });
        elt.tiers_Bank_Accounts.forEach(eltadress => {
          const ribtext = eltadress.account_Number;
          code.push({item_id: elt.uuid, item_text: ribtext});
        });

        // coll.push({ item_id: '0', item_text: 'Ajouter Nouvelle adresse'  });
        // code.push({ item_id: '0', item_text: 'Ajouter Nouveau RIB'  });
        this.fournisseurAddressList.next(this.coll);
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
    if (this.SelectAddress.item_text !== undefined || this.SelectAddress.item_text !== '') {
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
    this.clientModel.logo =  this.clientModel.logo = 'http://ns3012518.ip-149-202-74.eu:8762' + this.clientselect.logo;
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

  addcomment() {
    const id = this.facturelist.length;
    this.facturelist.push({type: 3, id,  totalline: ''});
    this.linestotallist.push(new LineModel(id , 'commentaire', '', '', '', '', '', '', '' , '', '' ));
  }

  remove(id: any , idline: any) {
    debugger;
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

    // console.log( 'id : ' + list[list.length - 1].id + ' description : ' + list[list.length - 1].description + ' subtotal : ' + list[list.length - 1].subtotal );
    // console.log( 'id : ' + this.linestotallist[this.linestotallist.length].id + ' description : ' + this.linestotallist[list.this.linestotallist].descriptionproduct + ' subtotal : ' + this.linestotallist[this.linestotallist.length].prixnet );
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
    if (payementype === 'cheque') {  this.payementype = 'cheque'; }
    if (payementype === 'traite') {  this.payementype = 'traite'; }
    if (payementype === 'card_crédit') {  this.payementype = 'carte crédit'; }
    if (payementype === 'éspèce') {  this.payementype = 'éspèce'; }
    if (payementype === 'virement') {  this.payementype = 'virement'; }


  }
  preview(content, uuid: any) {
    this.modalService.open(content,  {size: 'xl'});
    this.selectedInvoice = this.allInvoices.find(elt => elt.uuid === uuid);
    this.fournisseurService.gettiers(this.selectedInvoice.customer).subscribe(resp => {
      this.selectedTier = resp;
      this.selectedAddress = resp.tiers_address.find(elt => elt.uuid === this.selectedInvoice.customerAdress);
    });
  }

  async pdfDowload(contentPDF: any) {
    this.modalService.open(contentPDF, {size: 'xl'});
    const DATA = document.querySelector('.htmlData');
    const doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    doc.fromHTML(DATA.innerHTML, 15, 15);
    // doc.output('dataurlnewwindow');
  }

  download() {
    const doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    // Save the PDF
    doc.save('Test.pdf');
  }

  displayMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      document.querySelector('.menu').classList.add('show');
    } else {document.querySelector('.menu').classList.remove('show'); }
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
  selectPurchaseType(event: any) {

    const codetype = this.arrTypeAchat.filter(
      item => item.label === event.option.value);
    this.purchaseType = codetype[0].code;
  }

  payer(contentPayment, id) {
    this.new_left_to_pay = this.allInvoices[id].left_to_pay;
    this.oldlefttopay = this.allInvoices[id].left_to_pay;
    this.new_total = this.allInvoices[id].total;
    this.modalService.open(contentPayment, {size: 'xl'});
  }

  activerRS() {
    document.querySelector('.RSactive').classList.add('show');
  }
  disactiverRS(id) {
    document.querySelector('.RSactive').classList.remove('show');
    this.new_left_to_pay = this.allInvoices[id].left_to_pay;
    this.new_total = this.allInvoices[id].total;
    this.total_RS = '0';
    this.left_to_pay_RS = '0';
  }
  getUpdatedvalue(event: any, id: number) {
    this.new_left_to_pay = event;
  }
  getUpdatedListTransaction(event: any, id: number) {
    this.listTransactionForPayment = event;
  }

  changeRS(evt, id) {
    const left_to_pay = this.allInvoices[id].left_to_pay;
    this.new_total = this.allInvoices[id].total;
    this.total_RS = '0';
    this.left_to_pay_RS = '0';
    console.log(evt.target.value);
    this.unit_RS = evt.target.value;
    this.total_RS = ((Number(this.new_total) * Number(this.unit_RS)) / 100).toFixed(2);
    this.new_total = (Number(this.new_total) - Number(this.total_RS)).toFixed(2);
    // this.left_to_pay_RS = ((Number(this.new_left_to_pay) * Number(this.unit_RS)) / 100).toFixed(2);
    this.new_left_to_pay = (Number(left_to_pay) - Number(this.total_RS)).toFixed(2);
  }
  compenser(id) {
    document.querySelector('.rs-showing').classList.add('rs_notshowing');
    document.querySelector('.rs_class').classList.add('show');
    this.RS_model = new RetenueSourceModel(this.total_RS, null ,
     this.allInvoices[id].uuid, false, this.unit_RS, true, 'VALIDE',  this.allInvoices[id].customer, '', new Date());
  }

  removeRS() {
    document.querySelector('.RSactive').classList.remove('show');
    document.querySelector('.rs-showing').classList.remove('rs_notshowing');
    document.querySelector('.rs_class').classList.remove('show');
    (document.getElementById('RSYES') as HTMLInputElement).checked = true;
    this.unit_RS = null;
    this.RS_model.amount = '';
    this.new_left_to_pay = Number( this.new_left_to_pay) + Number(this.total_RS);
  }

  validerPayment() {
  console.log(this.checked);
  const paymentModel = new PaymentModel(this.new_left_to_pay, this.unit_RS, this.oldlefttopay, this.total_RS, this.listTransactionForPayment, this.sensTransactions.DEBIT);
  if (this.listTransactionForPayment.length > 0 ) {
  let index = this.listTransactionsPayed.length - 1;
  this.listTransactionForPayment.forEach((elt ) => {
    index++;
    this.verfierValidation(elt, index);
  });
  if (this.validationValue) {
    console.log('success');
    this.buillingService.payer(paymentModel).subscribe(resp => {
      setTimeout(() => {  document.querySelector('.alert-success').classList.add('show'); }, 3000);
    });
  }
  } else {
    document.querySelector('#alert-required-vide').classList.add('show');
  }
  }

  verfierValidation(elt: any, index: number): boolean {
    this.validationValue = true;
    if (elt.payType === this.paymentTypeEnum.ESPECE_PAYMENT) {
      if (elt.amount === '' || elt.valueDate === null || elt.caisse === '') {
        document.querySelector('#alert-required' + index).classList.add('show');
        document.querySelector('#collapsepayment' + index).classList.add('show');
        document.querySelector('#alert-required-vide').classList.remove('show');
        this.validationValue = false;
      }
    } else if (elt.payType === this.paymentTypeEnum.CHEQUE_PAYMENT) {
      if (elt.amount === '' || elt.valueDate === null || elt.caisse === '' || elt.deadlinedate === null || elt.numcheque === '') {
        document.querySelector('#alert-required' + index).classList.add('show');
        document.querySelector('#collapsepayment' + index).classList.add('show');
        document.querySelector('#alert-required-vide').classList.remove('show');
        this.validationValue = false;
      }
    } else if (elt.payType === this.paymentTypeEnum.VIREMENT_PAYMENT) {
      if (elt.amount === '' || elt.valueDate === null || elt.caisse === '') {
        document.querySelector('#alert-required' + index).classList.add('show');
        document.querySelector('#collapsepayment' + index).classList.add('show');
        document.querySelector('#alert-required-vide').classList.remove('show');
        this.validationValue = false;
      }
    } else if (elt.payType === this.paymentTypeEnum.TRAITE_PAYMENT) {
      if (elt.amount === '' || elt.valueDate === null || elt.caisse === '' || elt.deadlinedate === null || elt.nomtraite === '') {
        document.querySelector('#alert-required' + index).classList.add('show');
        document.querySelector('#collapsepayment' + index).classList.add('show');
        document.querySelector('#alert-required-vide').classList.remove('show');
        this.validationValue = false;
      }
    }
    return this.validationValue;
  }

  annulerFacture() {
    console.log('annuler facture');
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      document.querySelector('.menu').classList.add('show');
    } else {document.querySelector('.menu').classList.remove('show'); }
  }

  check() {
    this.checked = !this.checked;
  }

  }
