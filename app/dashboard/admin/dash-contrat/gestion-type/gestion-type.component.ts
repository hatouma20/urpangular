import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {ContractTypeDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-TypeDto';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-gestion-type',
  templateUrl: './gestion-type.component.html',
  styleUrls: ['gestion-type.component.css'],
  // styles: [
  //   `
  //     ::ng-deep   .modal.show .modal-dialog {
  //       max-width: 27% !important;
  //     }
  //   `
  // ]
})
export class GestionTypeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  contractType: ContractTypeDto = new ContractTypeDto(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  editField: string;
  contractTypeSelected: any;
  contractTypeList: Array<any> = [];

  constructor(private contractService: ContractService,
              private modalService: NgbModal, ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.contractService.getAllContractType().subscribe(response => {
      this.contractTypeList = response;
      this.dtTrigger.next();
    });
  }

  updateList(id: number, property: string, event: any) {
    this.contractTypeSelected = {
      description : this.contractTypeList[id].description ,
      id : this.contractTypeList[id].id ,
      type : this.contractTypeList[id].type,
    };
    const editField = event.target.textContent;
    this.contractTypeSelected[property] = editField;
    this.contractService.updateContractType(this.contractTypeSelected).subscribe(response =>
      // window.location.reload()
      this.contractTypeList[id][property] = response[property]
    );
    document.getElementById(property + id).contentEditable = String(false);
    document.getElementById(property + id).classList.remove('focus');
  }

  remove(id: any) {
    const contractTypeSelected = this.contractTypeList[id];
    this.contractService.deleteContractType(contractTypeSelected.id).subscribe(response =>
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
      .createContractType(  {
        description: this.contractType.description.value,
        type: this.contractType.type.value,
        id: 0,
      }, ).subscribe(response => {
    });
    // tslint:disable-next-line:no-unused-expression
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
    this.contractTypeList.push({
      description: this.contractType.description.value,
      type: this.contractType.type.value,
      id: 0,
    });
  }

  private FormIsValid() {
    for (const element in this.contractType) {
      if (this.contractType[element].dirty) {
        this.contractType.isValid = false;
        break;
      } else {
        this.contractType.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.contractType.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.contractType.description.value === '') {
      this.contractType.description.dirty = true;
      this.contractType.description.class = 'invalid';
      this.contractType.description.error = 'Description should not be empty';
    } else {
      this.contractType.description.dirty = false;
      this.contractType.description.class = 'valid';
      this.contractType.description.error = '';
    }
    if (this.contractType.type.value === '') {
      this.contractType.type.dirty = true;
      this.contractType.type.class = 'invalid';
      this.contractType.type.error = 'Type should not be empty';
    } else {
      this.contractType.type.dirty = false;
      this.contractType.type.class = 'valid';
      this.contractType.type.error = '';
    }
  }
  open(content) {
    this.modalService.open(content);
  }
}
