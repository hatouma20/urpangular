import {Component, OnInit} from '@angular/core';
import {StockRequestForm} from '../../../../shared/model/request-payload/stock/stock-request-form';
import {AddstockResult} from '../../../../shared/model/response-payload/stock/add-stock-result';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {StockService} from '../../../../shared/services/back-end/stock/stock.service';
import {NationalitiesService} from '../../../../shared/services/nationalities/nationalities';
import {Observable, Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'wind-add-stock-component',
  templateUrl: './add-stock-component.component.html',
  styleUrls: ['./add-stock-component.component.scss']
})
export class AddStockComponentComponent implements OnInit {

  editField: string;
  errorMessage: string;
  stocklist: Array<any> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  servicelist: Array<AddstockResult> = [];


  limitSelection = false;
  disabled = false;
  selected = false;
  coll: any = [];
  attributes = [];


  selectedetatvente: any;
  selectedetatachat: any;
  selectedlots: any;
  selectedcodebarre: any;
  entrepot: any;
  natureproduit: any;
  poidunite: any;
  longueurunite: any;
  largeurunite: any;
  heighttype: any;
  pricetype: any;
  pricevente: any;
  tauxtva: any;
  codecomptableachat: any;
  codecomptablevente: any;
  codecomptableventeexport: any;
  codecomptableachatimport: any;


  dropdownSettings: any = {
    singleSelection: false,
    idField: 'uuid',
    textField: 'valueType',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  listfournisseur = [];
  listdepot = [];
  isEnabled: boolean;
  selectedtype: any;
  depotselected: any;
  selectedtypestock: any;
  stockaddForm: StockRequestForm = new StockRequestForm(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {
      values: [], dirty: false, class: '', error: ''
    },
    {value: false, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
     true
  );

  addStockform: AddstockResult = new AddstockResult(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    [],
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    );

  nationalities: any;
  constructor(private stockservice: StockService,
              private fournisseurservice: FournisseurService,
              private modalService: NgbModal,
              private router: Router,
              private  tiersservice: FournisseurService,
              private nationalitiesService: NationalitiesService) {}

  ngOnInit(): void {


    this.nationalities = this.nationalitiesService.nationalities;

    this.isEnabled = false;
    this.stockservice.getAllAttributes().subscribe(response1 =>
      this.attributes = response1);
    this.fournisseurservice.getAllTiers().subscribe(response =>
      this.listfournisseur = response);

    this.stockservice.getAlldepot().subscribe(responsedepot =>
      this.listdepot = responsedepot);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.stockservice.getAllProducts().map(ProductsResponse => {
      this.stocklist = ProductsResponse;
      this.dtTrigger.next();
      return this.stocklist;
    }).flatMap((stockList, index) => {
      stockList.forEach(product => {
        this.tiersservice.gettiers(product.supplier).subscribe(suplierResponse => {
          product.suppliername = suplierResponse.name;
        });
      });
      return Observable.of(stockList);
    }).subscribe(value => value);
  }

  getselectedfournisseur(event: any) {
    const rule = event.target as HTMLInputElement;
    if (rule.value === 'new') {
      this.router.navigateByUrl('/dashboard/fournisseur/fournisseur');
    } else {
      this.selectedtype = event.target.value;
      this.addStockform.supplier.value = this.selectedtype;
      console.log(this.selectedtype);
    }

  }

  getselecteddepot(event: any) {
    const rule = event.target as HTMLInputElement;
    if (rule.value === 'new') {
      this.router.navigateByUrl('/dashboard/stock/depots');
    } else {
      this.depotselected = event.target.value;
      this.addStockform.depot.value = this.selectedtype;
      console.log(this.selectedtype);
    }
  }
  getetatvente(event: any) {
    this.selectedetatvente = event.target.value;
  }
  getetatachat(event: any) {
    this.selectedetatachat = event.target.value;
  }
  getlotstype(event: any) {
    this.selectedlots = event.target.value;
  }
  getcodebarre(event: any) {
    this.selectedcodebarre = event.target.value;
  }
  getentrepot(event: any) {
    this.entrepot = event.target.value;
  }
  getnatureproduit(event: any) {
    this.natureproduit = event.target.value;
  }
  getpoidunite(event: any) {
    this.poidunite = event.target.value;
  }
  getlongueurunite(event: any) {
    this.longueurunite = event.target.value;
  }
  getLargeurunite(event: any) {
    this.largeurunite = event.target.value;
  }

  getheighttype(event: any) {
    this.heighttype = event.target.value;
  }
  getpricetype(event: any) {
    this.pricetype = event.target.value;
  }
  getpricevente(event: any) {
    this.pricevente = event.target.value;
  }
  gettauxtva(event: any) {
    this.tauxtva = event.target.value;
  }
  getcodecomptable(event: any) {
    this.codecomptableachat = event.target.value;
  }
  getcodecomptablevente(event: any) {
    this.codecomptablevente = event.target.value;
  }
  getcodecomptableventeexport(event: any) {
    this.codecomptableventeexport = event.target.value;
  }
  getcodecomptableachatimport(event: any) {
    this.codecomptableachatimport = event.target.value;
  }



  onAdstockFormSubmit() {
    this.stockservice.createstock(  {
      accounting_Code_Export_Sale:  this.codecomptableventeexport,
          accounting_Code_Purchase: this.codecomptablevente,
          accounting_Code_Purchase_Import: this.codecomptableachatimport,
          accounting_Code_Sale:  this.codecomptableachat,

          barcode_Type: this.selectedcodebarre,
          barcode_Value: this.addStockform.barcode_Value.value,
          buying_Price: this.addStockform.buying_Price.value,

          description: this.addStockform.description.value,
          douanière: this.addStockform.douaniere.value,
          fix_Sale_Price: false,
          gain_Margin: this.addStockform.gain_Margin.value,
          height: this.addStockform.height.value,
          id_product: this.addStockform.id_product.value,


          label: this.addStockform.label.value,
          length:   this.addStockform.length.value,
          length_Unit: this.longueurunite,
          lots_Series: this.addStockform.lots_Series.value,
          min_Stock: this.addStockform.min_Stock.value,
          name: this.addStockform.name.value,
          nature_of_Product: this.addStockform.nature_of_Product.value,
          note: this.addStockform.note.value,
          origin_Country: this.addStockform.origin_Country.value,
          photo: this.addStockform.photo.value,

          ref: this.addStockform.ref.value,
          selling_Price: this.pricevente,
          selling_Price_Min: this.addStockform.selling_Price_Min.value,
          selling_Type: this.pricetype,
          state_Purchase: this.addStockform.state_Purchase.value,
          state_Sale: this.addStockform.state_Sale.value,
          stock: this.addStockform.stock.value,
          supplier: this.addStockform.supplier.value,
          surface: this.addStockform.surface.value,
          surface_Unit: this.addStockform.surface_Unit.value,
          tva: this.tauxtva,
          uuid: this.addStockform.uuid.value,
          volume: this.addStockform.volume.value,
          volume_Unit: this.addStockform.volume_Unit.value,
          warehouses: [{
            uuid: this.depotselected
          }],
          weight: this.addStockform.weight.value,
          weight_Unit: this.poidunite,
          width: this.addStockform.width.value,
    } ).subscribe(response => {
      console.log(response);
      this.stocklist.push(response);
    });
  }

  onFormSubmit() {

      this.onAdstockFormSubmit();

  }
  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.stockaddForm.description.value === '') {
      this.stockaddForm.description.dirty = true;
      this.stockaddForm.description.class = 'invalid';
      this.stockaddForm.description.error = 'Description should not be empty';
    } else {
      this.stockaddForm.description.dirty = false;
      this.stockaddForm.description.class = 'valid';
      this.stockaddForm.description.error = '';
    }
    if (this.stockaddForm.nom.value === '') {
      this.stockaddForm.nom.dirty = true;
      this.stockaddForm.nom.class = 'invalid';
      this.stockaddForm.nom.error = 'Nom should not be empty';
    } else {
      this.stockaddForm.nom.dirty = false;
      this.stockaddForm.nom.class = 'valid';
      this.stockaddForm.nom.error = '';
    }
    if (this.stockaddForm.image.value === '') {
      this.stockaddForm.image.dirty = true;
      this.stockaddForm.image.class = 'invalid';
      this.stockaddForm.image.error = 'Image URL should not be empty';
    } else {
      this.stockaddForm.image.dirty = false;
      this.stockaddForm.image.class = 'valid';
      this.stockaddForm.image.error = '';
    }
    if (this.stockaddForm.supplier.value === '') {
      this.stockaddForm.supplier.dirty = true;
      this.stockaddForm.supplier.class = 'invalid';
      this.stockaddForm.supplier.error = 'Supplier should not be empty';
    } else {
      this.stockaddForm.supplier.dirty = false;
      this.stockaddForm.supplier.class = 'valid';
      this.stockaddForm.supplier.error = '';
    }
    if (this.stockaddForm.stock.value === '') {
      this.stockaddForm.stock.dirty = true;
      this.stockaddForm.stock.class = 'invalid';
      this.stockaddForm.stock.error = 'stock should not be empty';
    } else {
      this.stockaddForm.stock.dirty = false;
      this.stockaddForm.stock.class = 'valid';
      this.stockaddForm.stock.error = '';
    }
    if (this.stockaddForm.priceIn.value === null) {
      this.stockaddForm.priceIn.dirty = true;
      this.stockaddForm.priceIn.class = 'invalid';
      this.stockaddForm.priceIn.error = 'priceIn should not be empty';
    } else {
      this.stockaddForm.priceIn.dirty = false;
      this.stockaddForm.priceIn.class = 'valid';
      this.stockaddForm.priceIn.error = '';
    }
  }
  private FormIsValid() {
    if (this.stockaddForm.description.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.nom.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.image.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.supplier.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.stock.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.priceIn.dirty) {
      this.stockaddForm.isValid = false;
    } else {
      this.stockaddForm.isValid = true;
    }
    if (this.stockaddForm.isValid === true) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.remove('show');
    }
    // tslint:disable-next-line:no-unused-expression
    return (this.stockaddForm.isValid);
  }
  onItemSelect(item: any) {
    const a = this.coll.list;
    this.stockaddForm.attributes.values.push(
      {
        uuid: item.uuid,
        description: item.description,
        label: item.label,
        status: item.status,
        idattribute: item.idattribute,
        isValid: true,
        typevalue: item.valueType,
      }
     );
    this.selected = true;
  }
  onItemDeSelect(item: any) {
    this.stockaddForm.attributes.values.forEach((elt, index) => {
      if (elt.uuid === item.uuid) {
        this.stockaddForm.attributes.values.splice(index, 1);
      }
    });
    this.selected = false;
  }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }



  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.stocklist[id][property] = editField;
    const currentTeam = this.stocklist[id];
    this.stockservice.update(currentTeam).subscribe(response =>
      console.log(response)
    );
  }
  remove(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteproduct(id).subscribe(response =>
      window.location.reload()
    );
  }
  open(content) {
    this.modalService.open(content,  {size: 'xxl'});
  }
  openn(content) {
    this.modalService.open(content);
  }
  removeservice(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteservice(id).subscribe(response =>
      window.location.reload()
    );
  }
}
