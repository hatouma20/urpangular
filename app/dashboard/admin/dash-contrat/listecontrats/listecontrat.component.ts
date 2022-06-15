import {Component, OnInit} from '@angular/core';
import {CollaboratorBankAccount} from '../../../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {CollaboratorModel} from '../../../../shared/model/response-payload/collaborators/collaborator-model';
import {ContractDocument} from '../../../../shared/model/response-payload/collaborators/contrat/contract-document';
import {ContractDurationDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-DurationDto';
import {ContractTypeDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-TypeDto';
import {ContratModel} from '../../../../shared/model/response-payload/collaborators/contrat/contrat-model';
import {HiringReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/hiring-ReasonDto';
import {LeavingJobReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/leaving-Job-ReasonDto';
import {SalaryDto} from '../../../../shared/model/response-payload/collaborators/contrat/salaryDto';
import {TimeQuota} from '../../../../shared/model/response-payload/collaborators/contrat/time-Quota';
import {TrialPeriodDto} from '../../../../shared/model/response-payload/collaborators/contrat/trial-Period-Dto';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';
import * as moment from 'moment';
import {TeamModel} from "../../../../shared/model/response-payload/collaborators/teams/team";
@Component({
  selector: 'wind-listcontrat',
  templateUrl: './listecontrat.component.html',
  styleUrls: ['listecontrat.component.css']
})
export class ListeContratComponent implements OnInit {
  editField: string;
  contractList: Array<any> = [];
  collaboratorList: Array<any> = [];
  contractTypeList: Array<any> = [];
  contractDurationList: Array<any> = [];
  contractSelected: any;
  collaboratorContract: ContratModel = new ContratModel(
    new CollaboratorModel(
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: 0, dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: new Date(), dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
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
      {value: false, dirty: false, class: '', error: ''},
      {value: null, dirty: false, class: '', error: ''},
      new CollaboratorBankAccount(
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
      ),
      true,
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      new TeamModel(
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {
          uuid: {value: '', dirty: false, class: '', error: ''},
        }
      ),
      {value: null, dirty: false, class: '', error: ''},
      ),
    new ContractDocument(
      [],
      '',
      null,
      ''),
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
     new ContractTypeDto(
      {value: '', dirty: false, class: '', error: ''},
       {value: '', dirty: false, class: '', error: ''},
      {value: '', dirty: false, class: '', error: ''},
      true    ),
    {value: new Date(), dirty: false, class: '', error: ''},
     new HiringReasonDto(
      {value: '', dirty: false, class: '', error: ''},
      '',
      {value: '', dirty: false, class: '', error: ''},
      true    ),
    0,
    new LeavingJobReasonDto(
      {value: '', dirty: false, class: '', error: ''},
      '',
      {value: '', dirty: false, class: '', error: ''},
      true    ),
    {value: '', dirty: false, class: '', error: ''},
    new SalaryDto(
      0,
      0,
      0,
      0,
      '',
      0,
       new TimeQuota(
        new Date(),
        0,
        0,
        new Date(),
        0,
        '',
        0,
        0,
        0
      )
    ),
     new TrialPeriodDto(
      '',
      0,
      0,
      new Date(),
      new Date(),
      ''
    ),
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
);
  constructor(private contractService: ContractService,
              private sirhService: CollaboratorService) {
  }

  ngOnInit(): void {
    this.contractService.getAllContract().subscribe(response =>
      this.contractList = response);
    this.contractService.getAllContractType().subscribe(response =>
      response.forEach(elt => {
        this.contractTypeList.push({
          name: elt.type,
          id: elt.id
        });
      })
    );
    this.contractService.getAllContractDuration().subscribe(response =>
      response.forEach(elt => {
        this.contractDurationList.push({
          duation: elt.duation + '' + elt.unit,
          id: elt.id
        });
      })
    );
    this.sirhService.getAllCollaborators().subscribe(response => {
      response.forEach(elt => {
        this.collaboratorList.push({
          name: elt.firstname + ' ' + elt.lastname,
          uuid: elt.uuid
        });
      });
    });
  }
  updateList(id: number, property: string, event: any) {
    this.contractSelected = {
      description : this.contractList[id].description ,
      duation : this.contractList[id].duation,
      id : this.contractList[id].id,
      unit : this.contractList[id].unit,
    };
    const editField = event.target.textContent;
    this.contractSelected[property] = editField;
    this.contractService.updateContract(this.contractSelected).subscribe(response =>
      // window.location.reload()
      this.contractList[id][property] = response[property]
    );
    document.getElementById(property + id).contentEditable = String(false);
    document.getElementById(property + id).classList.remove('focus');
  }

  remove(id: any) {
    const contractSelected = this.contractList[id];
    this.contractService.deleteContract(contractSelected.id).subscribe(response =>
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
      .createContract(  {
        collaborator: {
          address: '',
          city: '',
          id: '',
          country: '',
          dateOfBirth: '',
          faxNumber: '',
          firstname: '',
          idCardNumber: '',
          lastname: '',
          maidenName: '',
          matricule: '',
          mobileNumber: '',
          passportId: '',
          personalEmail: '',
          personalPicture: '',
          phoneNumber: '',
          postalCode: '',
          proEmail: '',
          salutation: '',
          socialSecurityNumber: '',
          state: '',
          status: '',
          uuid: this.collaboratorContract.collaborator.uuid.value,
        },
        contractType: {
          description: '',
          id: this.collaboratorContract.contractType.id,
          type: ''
        },
        contractDuration: {
          description: '',
          duation: '',
          unit: '',
          id: this.collaboratorContract.id
        },
        contractStatus: 'ACTIVE',
        hiringDate: moment(new Date()).format('YYYY-MM-DD'),
        id: 0,
        ref: '',


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
    for (const element in this.collaboratorContract) {
      if (this.collaboratorContract[element].dirty) {
        this.collaboratorContract.isValid = false;
        break;
      } else {
        this.collaboratorContract.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.collaboratorContract.isValid;
  }

  private validateRequiredInputForm() {
    if (this.collaboratorContract.collaborator.uuid.value === '') {
      this.collaboratorContract.collaborator.uuid.dirty = true;
      this.collaboratorContract.collaborator.uuid.class = 'invalid';
      this.collaboratorContract.collaborator.uuid.error = 'Description should not be empty';
    } else {
      this.collaboratorContract.collaborator.uuid.dirty = false;
      this.collaboratorContract.collaborator.uuid.class = 'valid';
      this.collaboratorContract.collaborator.uuid.error = '';
    }
    // if (this.contractDuration.duation.value === '') {
    //   this.contractDuration.duation.dirty = true;
    //   this.contractDuration.duation.class = 'invalid';
    //   this.contractDuration.duation.error = 'Duation should not be empty';
    // } else {
    //   this.contractDuration.duation.dirty = false;
    //   this.contractDuration.duation.class = 'valid';
    //   this.contractDuration.duation.error = '';
    // }
    // if (this.contractDuration.unit.value === '') {
    //   this.contractDuration.unit.dirty = true;
    //   this.contractDuration.unit.class = 'invalid';
    //   this.contractDuration.unit.error = 'Unit should not be empty';
    // } else {
    //   this.contractDuration.unit.dirty = false;
    //   this.contractDuration.unit.class = 'valid';
    //   this.contractDuration.unit.error = '';
    // }
  }
}
