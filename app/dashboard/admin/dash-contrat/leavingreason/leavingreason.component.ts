import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {LeavingJobReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/leaving-Job-ReasonDto';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-leaving-reason',
  templateUrl: './leavingreason.component.html',
  styleUrls: ['leavingreason.component.css'],
  styles: [
    `
      ::ng-deep   .modal.show .modal-dialog {
        max-width: 27% !important;
      }
    `
  ]
})
export class LeavingReasonComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  leavingReason: LeavingJobReasonDto = new LeavingJobReasonDto(
    {value: '', dirty: false, class: '', error: ''},
    '',
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  editField: string;
  leavingReasonSelected: any;
  leavinjobReasonList: Array<any> = [];
  constructor(private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.contractService.getAllLeavingReason().subscribe(response => {
      this.leavinjobReasonList = response;
      this.dtTrigger.next();
    });
  }

  updateList(id: number, property: string, event: any) {
    this.leavingReasonSelected = {
      description : this.leavinjobReasonList[id].description ,
      id : this.leavinjobReasonList[id].id,
      reason : this.leavinjobReasonList[id].reason,
    };
    const editField = event.target.textContent;
    this.leavingReasonSelected[property] = editField;
    this.contractService.updateLeavingReason(this.leavingReasonSelected).subscribe(response =>
      // window.location.reload()
      this.leavinjobReasonList[id][property] = response[property]
    );
    document.getElementById(property + id).contentEditable = String(false);
    document.getElementById(property + id).classList.remove('focus');
  }

  remove(id: any) {
    const leavingReasonSelected = this.leavinjobReasonList[id];
    this.contractService.deleteLeavingReason(leavingReasonSelected.id).subscribe(response =>
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
      .createLeavingReason(  {
        description: this.leavingReason.description.value,
        id: 0,
        reason: this.leavingReason.reason.value
      }, ).subscribe(response => {
    });
    // tslint:disable-next-line:no-unused-expression
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
  }

  private FormIsValid() {
    for (const element in this.leavingReason) {
      if (this.leavingReason[element].dirty) {
        this.leavingReason.isValid = false;
        break;
      } else {
        this.leavingReason.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.leavingReason.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.leavingReason.description.value === '') {
      this.leavingReason.description.dirty = true;
      this.leavingReason.description.class = 'invalid';
      this.leavingReason.description.error = 'Description should not be empty';
    } else {
      this.leavingReason.description.dirty = false;
      this.leavingReason.description.class = 'valid';
      this.leavingReason.description.error = '';
    }
    if (this.leavingReason.reason.value === '') {
      this.leavingReason.reason.dirty = true;
      this.leavingReason.reason.class = 'invalid';
      this.leavingReason.reason.error = 'Reason should not be empty';
    } else {
      this.leavingReason.reason.dirty = false;
      this.leavingReason.reason.class = 'valid';
      this.leavingReason.reason.error = '';
    }
  }
  open(content) {
    this.modalService.open(content);
  }
}
