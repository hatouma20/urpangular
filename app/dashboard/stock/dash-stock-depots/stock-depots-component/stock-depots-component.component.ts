import {Component, OnInit} from '@angular/core';
import {ValueTypeEnum} from '../../../../shared/model/enum-type/stock/type-value-enum';
import {StockAttributeForm} from '../../../../shared/model/request-payload/stock/stock-attribut-form';
import {AddattributeResult} from '../../../../shared/model/response-payload/stock/add-attribute-result';
import {StockService} from '../../../../shared/services/back-end/stock/stock.service';
import {Subject} from 'rxjs';
import {NationalitiesService} from "../../../../shared/services/nationalities/nationalities";
import {StockDepotResultForm} from "../../../../shared/model/request-payload/stock/stock-depot-result";
import {AddDepotResult} from "../../../../shared/model/response-payload/stock/add-depot-result";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeaveType} from "../../../../shared/constants/leave-type";

@Component({
  selector: 'wind-stock-depots-component',
  templateUrl: './stock-depots-component.component.html',
  styleUrls: ['./stock-depots-component.component.scss']
})
export class StockDepotsComponentComponent implements OnInit {

  nationalities: any;
  status: any;

  depotsList: Array<any> = [];

  attributesList: Array<AddattributeResult> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  editField: string;
  selected = '';
  typevalues = ValueTypeEnum;
  keytypevalues = [];

  /*______________________*/
  depotForm: StockDepotResultForm = new StockDepotResultForm(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
  )
  /*______________________*/

  attributeaddForm: StockAttributeForm = new StockAttributeForm(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  private uuid: any;
  constructor(private stockservice: StockService,
              private modalService: NgbModal,
              private nationalitiesService: NationalitiesService) {
  }
  ngOnInit(): void {
    this.nationalities = this.nationalitiesService.nationalities;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.keytypevalues = Object.keys(this.typevalues).filter(k => !isNaN(Number(k)));
    this.stockservice.getAlldepot().subscribe(response => {
      this.depotsList = response;
      this.dtTrigger.next();
    });
  }

  getstatus(event: any) {
    this.status = event.target.value;
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.depotsList[id][property] = editField;
    const currentTeam = this.depotsList[id];
    this.stockservice.update(currentTeam).subscribe(response =>
      console.log(response)
    );
  }
  remove(uuid: any, id: any) {
    this.stockservice.uuid = uuid;
    this.stockservice.deletedepot(uuid).subscribe(response =>
      this.depotsList.splice(id, 1)
    );
    this.modalService.dismissAll();
  }
  add() {
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  onAddubmit() {


    this.stockservice.createdepot({
      address: this.depotForm.address.value,
      city: this.depotForm.city.value,
      country: this.depotForm.country.value,
      description: this.depotForm.description.value,
      fax: this.depotForm.fax.value,
      name: this.depotForm.name.value,
      phoneNumber: this.depotForm.phoneNumber.value,
      postalCode: this.depotForm.postalCode.value,
      reference: this.depotForm.reference.value,
      status: this.status,
      uuid: '',
    }).subscribe(response => {
      // window.location.reload();
      console.log(response);
      this.depotsList.push(response);

    });
  }

   onFormSubmit() {

      this.onAddubmit();

  }
  open(content) {
    this.modalService.open(content);
  }
  getselectedtype(event: any) {
    this.selected = event.target.value;
    this.attributeaddForm.typevalue.value = this.typevalues[this.selected];
  }

  private validateRequiredInputForm() {
    if (this.attributeaddForm.description.value === '') {
      this.attributeaddForm.description.dirty = true;
      this.attributeaddForm.description.class = 'invalid';
      this.attributeaddForm.description.error = 'description should not be empty';
    } else {
      this.attributeaddForm.description.dirty = false;
      this.attributeaddForm.description.class = 'valid';
      this.attributeaddForm.description.error = '';
    }
    if (this.attributeaddForm.label.value === '') {
      this.attributeaddForm.label.dirty = true;
      this.attributeaddForm.label.class = 'invalid';
      this.attributeaddForm.label.error = 'label should not be empty';
    } else {
      this.attributeaddForm.label.dirty = false;
      this.attributeaddForm.label.class = 'valid';
      this.attributeaddForm.label.error = '';
    }
    if (this.attributeaddForm.status.value === null) {
      this.attributeaddForm.status.dirty = true;
      this.attributeaddForm.status.class = 'invalid';
      this.attributeaddForm.status.error = 'status should not be empty';
    } else {
      this.attributeaddForm.status.dirty = false;
      this.attributeaddForm.status.class = 'valid';
      this.attributeaddForm.status.error = '';
    }
    if (this.attributeaddForm.typevalue.value === '') {
      this.attributeaddForm.typevalue.dirty = true;
      this.attributeaddForm.typevalue.class = 'invalid';
      this.attributeaddForm.typevalue.error = 'type   should not be empty';
    } else {
      this.attributeaddForm.typevalue.dirty = false;
      this.attributeaddForm.typevalue.class = 'valid';
      this.attributeaddForm.typevalue.error = '';
    }
  }

  private FormIsValid() {
    if (this.attributeaddForm.description.dirty) {
      this.attributeaddForm.isValid = false;
    } else {
      this.attributeaddForm.isValid = true;
    }
    if (this.attributeaddForm.typevalue.dirty) {
      this.attributeaddForm.isValid = false;
    } else {
      this.attributeaddForm.isValid = true;
    }

    if (this.attributeaddForm.label.dirty) {
      this.attributeaddForm.isValid = false;
    } else {
      this.attributeaddForm.isValid = true;
    }
    if (this.attributeaddForm.isValid === true) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.remove('show');
    }
    // tslint:disable-next-line:no-unused-expression
    return (this.attributeaddForm.isValid);
  }
}
