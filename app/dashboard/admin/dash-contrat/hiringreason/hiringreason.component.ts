import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {HiringReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/hiring-ReasonDto';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-hiring-reason',
  templateUrl: './hiringreason.component.html',
  styleUrls: ['hiringreason.component.css'],
  styles: [
    `
      ::ng-deep   .modal.show .modal-dialog {
        max-width: 27% !important;
      }
    `
  ]
})
export class HiringReasonComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hiringReason: HiringReasonDto = new HiringReasonDto(
    {value: '', dirty: false, class: '', error: ''},
    '',
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  editField: string;
  hiringReasonSelected: any;
  hiringReasonList: Array<any> = [];
  constructor(private contractService: ContractService,
              private modalService: NgbModal, ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.contractService.getAllhiringReason().subscribe(response => {
      this.hiringReasonList  = response;
      this.dtTrigger.next();
      });
  }

  updateList(id: number, property: string, event: any) {
    this.hiringReasonSelected = {
      description : this.hiringReasonList[id].description ,
      id : this.hiringReasonList[id].id,
      reason : this.hiringReasonList[id].reason,
    };
    const editField = event.target.textContent;
    this.hiringReasonSelected[property] = editField;
    this.contractService.updatehiringReason(this.hiringReasonSelected).subscribe(response =>
      // window.location.reload()
      this.hiringReasonList[id][property] = response[property]
    );
    document.getElementById(property + id).contentEditable = String(false);
    document.getElementById(property + id).classList.remove('focus');
  }

  remove(id: any) {
    const hiringReasonSelected = this.hiringReasonList[id];
    this.contractService.deletehiringReason(hiringReasonSelected.id).subscribe(response =>
      window.location.reload()
    );
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
      .createhiringReason(  {
        description: this.hiringReason.description.value,
        reason: this.hiringReason.reason.value,
        id: 0,
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
    for (const element in this.hiringReason) {
      if (this.hiringReason[element].dirty) {
        this.hiringReason.isValid = false;
        break;
      } else {
        this.hiringReason.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.hiringReason.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.hiringReason.description.value === '') {
      this.hiringReason.description.dirty = true;
      this.hiringReason.description.class = 'invalid';
      this.hiringReason.description.error = 'Description should not be empty';
    } else {
      this.hiringReason.description.dirty = false;
      this.hiringReason.description.class = 'valid';
      this.hiringReason.description.error = '';
    }
    if (this.hiringReason.reason.value === '') {
      this.hiringReason.reason.dirty = true;
      this.hiringReason.reason.class = 'invalid';
      this.hiringReason.reason.error = 'Reason should not be empty';
    } else {
      this.hiringReason.reason.dirty = false;
      this.hiringReason.reason.class = 'valid';
      this.hiringReason.reason.error = '';
    }
  }
  open(content) {
    this.modalService.open(content);
  }
}
