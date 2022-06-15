import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {ContractDurationDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-DurationDto';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-contratduration',
  templateUrl: './gestion-duration.component.html',
  styleUrls: ['gestion-duration.component.css'],
  // styles: [
  //   `
  //     ::ng-deep   .modal.show .modal-dialog {
  //       max-width: 27% !important;
  //     }
  //   `
  // ]
})

export class GestionDurationComponent implements OnInit {
  contractDurationSelected: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  contractDuration: ContractDurationDto = new ContractDurationDto(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  editField: string;
  contractDurationList: Array<any> = [];
  constructor(private contractService: ContractService,
              private modalService: NgbModal, ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.contractService.getAllContractDuration().subscribe(response => {
      this.contractDurationList = response;
      this.dtTrigger.next();
    });
  }

  updateList(id: number, property: string, event: any) {
    this.contractDurationSelected = {
      description : this.contractDurationList[id].description ,
      duation : this.contractDurationList[id].duation,
      id : this.contractDurationList[id].id,
      unit : this.contractDurationList[id].unit,
    };
    const editField = event.target.textContent;
    this.contractDurationSelected[property] = editField;
    this.contractService.updateContractDuation(this.contractDurationSelected).subscribe(response =>
      // window.location.reload()
      this.contractDurationList[id][property] = response[property]
    );
  }

  remove(id: any) {
    const contractDurationSelected = this.contractDurationList[id];
    this.contractService.deleteContractDuration(contractDurationSelected.id).subscribe(response =>
      window.location.reload()
    );
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  onFormSubmit() {
    this.validateRequiredInputForm();
    if (!this.FormIsValid()) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.add('show');
      return;
    } else {
      this.submitForm();
    }
  }

  private submitForm() {
    this.contractService
      .createContractDuattion(  {
      description: this.contractDuration.description.value,
      duation: this.contractDuration.duation.value,
      id: 0,
      unit: this.contractDuration.unit.value
   }, ).subscribe(response => {
    });
    // tslint:disable-next-line:no-unused-expression
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
    this.contractDurationList.push({
      description: this.contractDuration.description.value,
      duation: this.contractDuration.duation.value,
      id: 0,
      unit: this.contractDuration.unit.value
    });
  }

  private FormIsValid() {
    for (const element in this.contractDuration) {
      if (this.contractDuration[element].dirty) {
        this.contractDuration.isValid = false;
        break;
      } else {
        this.contractDuration.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.contractDuration.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.contractDuration.description.value === '') {
      this.contractDuration.description.dirty = true;
      this.contractDuration.description.class = 'invalid';
      this.contractDuration.description.error = 'Description should not be empty';
    } else {
      this.contractDuration.description.dirty = false;
      this.contractDuration.description.class = 'valid';
      this.contractDuration.description.error = '';
    }
    if (this.contractDuration.duation.value === '') {
      this.contractDuration.duation.dirty = true;
      this.contractDuration.duation.class = 'invalid';
      this.contractDuration.duation.error = 'Duation should not be empty';
    } else {
      this.contractDuration.duation.dirty = false;
      this.contractDuration.duation.class = 'valid';
      this.contractDuration.duation.error = '';
    }
    if (this.contractDuration.unit.value === '') {
      this.contractDuration.unit.dirty = true;
      this.contractDuration.unit.class = 'invalid';
      this.contractDuration.unit.error = 'Unit should not be empty';
    } else {
      this.contractDuration.unit.dirty = false;
      this.contractDuration.unit.class = 'valid';
      this.contractDuration.unit.error = '';
    }
  }
  open(content) {
    this.modalService.open(content);
  }
}
