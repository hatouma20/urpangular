import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {CollaboratorBankAccount} from '../../../../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {CollaboratorModel} from '../../../../../shared/model/response-payload/collaborators/collaborator-model';
import {ContractDocument} from '../../../../../shared/model/response-payload/collaborators/contrat/contract-document';
import {ContractDurationDto} from '../../../../../shared/model/response-payload/collaborators/contrat/contract-DurationDto';
import {ContractTypeDto} from '../../../../../shared/model/response-payload/collaborators/contrat/contract-TypeDto';
import {ContratModel} from '../../../../../shared/model/response-payload/collaborators/contrat/contrat-model';
import {HiringReasonDto} from '../../../../../shared/model/response-payload/collaborators/contrat/hiring-ReasonDto';
import {LeavingJobReasonDto} from '../../../../../shared/model/response-payload/collaborators/contrat/leaving-Job-ReasonDto';
import {SalaryDto} from '../../../../../shared/model/response-payload/collaborators/contrat/salaryDto';
import {TimeQuota} from '../../../../../shared/model/response-payload/collaborators/contrat/time-Quota';
import {TrialPeriodDto} from '../../../../../shared/model/response-payload/collaborators/contrat/trial-Period-Dto';
import {TeamModel} from '../../../../../shared/model/response-payload/collaborators/teams/team';
import {WindForm, WindFormElement} from '../../../../../shared/model/windForm';
import {CollaboratorService} from '../../../../../shared/services/back-end/collaborator/collaborator.service';
import {ContractService} from '../../../../../shared/services/back-end/contract/contract-service';
import {LeavesService} from '../../../../../shared/services/back-end/leaves/leaves-service';
import {NationalitiesService} from '../../../../../shared/services/nationalities/nationalities';

@Component({
  selector: 'wind-detail-collaborator',
  templateUrl: './detail-collaborator.component.html',
  styleUrls: ['../../../../dash-main/dash-main.component.css', 'detail-collaborator.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class DetailCollaborator implements OnInit {
  form: WindForm = new WindForm([
    new WindFormElement('accountnumber', '', 'text', [Validators.required, Validators.min(20)], 'Nom d\'utilisateur ou Email'),
    new WindFormElement('password', '', 'password', [Validators.required, Validators.min(4)], 'Mot de passe'),
  ]);
  // tslint:disable-next-line:no-input-rename
  theFormGroup: FormGroup;
  @Input('person') person: any;
  @Output() valueUpdate = new EventEmitter();
  // @Output() person: EventEmitter<any> = new EventEmitter<any>()
  myForm: FormGroup;
  cddtype = true;
  collaboratorResult: CollaboratorModel;
  firstcollaboratorResult: CollaboratorModel;
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
      6,
      0,
      new Date(),
      new Date(),
      'mois'
    ),
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  document = {uuid: ''};
  salary: SalaryDto = new SalaryDto(
    null,
    0,
    0,
    0,
    'MONTHLY',
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
    ),
  );
  trialPeriod: TrialPeriodDto = new TrialPeriodDto(
    '',
    6,
    0,
    null,
    null,
    'MONTHLY',
  );
  selectedelt: any;
  congeRulesList: any = [];
  sickLeaveRulesList: any = [];
  payedLeaveRulesList: any = [];
  contratListByCollaborator: Array<any> = [];
  contractDurationList: Array<any> = [];
  contractTypeList: Array<any> = [];
  newSalary: any;
  newTrial: any;
  leaveRules: any = [];
  ListRulesSelected: any = [];
  sickLeaveRules: any = {
    isdefault: false,
    name: '',
    leave: '',
    value: '',
    uuid: '',
    total: '',
    listleaveperday: ''
  };
  payedLeaveRules: any = {
    isdefault: false,
    name: '',
    leave: '',
    value: '',
    uuid: '',
    total: '',
    listleaveperday: ''
  };
  uuid: any;
  leaveRulesModel = {
    payedRuleuuid: '',
    sickRuleuuid: ''
  };
  url: string | ArrayBuffer = '';
  nationalities: any;
  private createSalaryFinished = new BehaviorSubject(null);
  private createTrialFinished = new BehaviorSubject(null);
  contractDocumentList: any = [];
  constructor(private sirhService: CollaboratorService,
              private contractService: ContractService,
              private modalService: NgbModal,
              private ref: ChangeDetectorRef,
              private leaveService: LeavesService,
              private router: Router,
              private nationalitiesService: NationalitiesService,
  ) {
  }
  ngOnInit(): void {
    this.firstcollaboratorResult = new CollaboratorModel(
      {value: this.person.address, dirty: false, class: '', error: ''},
      {value: this.person.city, dirty: false, class: '', error: ''},
      {value: this.person.id, dirty: false, class: '', error: ''},
      {value: this.person.country, dirty: false, class: '', error: ''},
      {value:  this.person.dateOfBirth, dirty: false, class: '', error: ''},
      {value: this.person.faxNumber, dirty: false, class: '', error: ''},
      {value: this.person.firstname, dirty: false, class: '', error: ''},
      {value: this.person.idCardNumber, dirty: false, class: '', error: ''},
      {value: this.person.lastname, dirty: false, class: '', error: ''},
      {value: this.person.maidenName, dirty: false, class: '', error: ''},
      {value: this.person.matricule, dirty: false, class: '', error: ''},
      {value: this.person.mobileNumber, dirty: false, class: '', error: ''},
      {value: this.person.passportId, dirty: false, class: '', error: ''},
      {value: this.person.personalEmail, dirty: false, class: '', error: ''},
      {value: this.person.personalPicture, dirty: false, class: '', error: ''},
      {value: this.person.phoneNumber, dirty: false, class: '', error: ''},
      {value: this.person.postalCode, dirty: false, class: '', error: ''},
      {value: this.person.proEmail, dirty: false, class: '', error: ''},
      {value: this.person.salutation, dirty: false, class: '', error: ''},
      {value: this.person.socialSecurityNumber, dirty: false, class: '', error: ''},
      {value: this.person.state, dirty: false, class: '', error: ''},
      {value: this.person.status, dirty: false, class: '', error: ''},
      {value: this.person.uuid, dirty: false, class: '', error: ''},
      {value: this.person.nationality, dirty: false, class: '', error: ''},
      {value: this.person.leavingreason, dirty: false, class: '', error: ''},
      {value: this.person.hearing_reason, dirty: false, class: '', error: ''},
      {value: this.person.isDeleted, dirty: false, class: '', error: ''},
      {value: this.person.created, dirty: false, class: '', error: ''},
      new CollaboratorBankAccount(
        {value: this.person.collaboratorBankAccount.uuid, dirty: false, class: '', error: ''},
        {value: this.person.collaboratorBankAccount.accountnumber, dirty: false, class: '', error: ''},
        {value: this.person.collaboratorBankAccount.bankname, dirty: false, class: '', error: ''},
      ),
      true,
      {value: this.person.civilState, dirty: false, class: '', error: ''},
      {value: this.person.dateOfCin, dirty: false, class: '', error: ''},
      {value: this.person.attachementCinBack, dirty: false, class: '', error: ''},
      {value: this.person.attachementCinFront, dirty: false, class: '', error: ''},
      new TeamModel(
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {
          uuid: {value: '', dirty: false, class: '', error: ''},
        }
      ),
      {value: this.person.teamBoss, dirty: false, class: '', error: ''},
    );
    this.collaboratorResult = new CollaboratorModel(
      {value: this.person.address, dirty: false, class: '', error: ''},
      {value: this.person.city, dirty: false, class: '', error: ''},
      {value: this.person.id, dirty: false, class: '', error: ''},
      {value: this.person.country, dirty: false, class: '', error: ''},
      {value:  this.person.dateOfBirth, dirty: false, class: '', error: ''},
      {value: this.person.faxNumber, dirty: false, class: '', error: ''},
      {value: this.person.firstname, dirty: false, class: '', error: ''},
      {value: this.person.idCardNumber, dirty: false, class: '', error: ''},
      {value: this.person.lastname, dirty: false, class: '', error: ''},
      {value: this.person.maidenName, dirty: false, class: '', error: ''},
      {value: this.person.matricule, dirty: false, class: '', error: ''},
      {value: this.person.mobileNumber, dirty: false, class: '', error: ''},
      {value: this.person.passportId, dirty: false, class: '', error: ''},
      {value: this.person.personalEmail, dirty: false, class: '', error: ''},
      {value: this.person.personalPicture, dirty: false, class: '', error: ''},
      {value: this.person.phoneNumber, dirty: false, class: '', error: ''},
      {value: this.person.postalCode, dirty: false, class: '', error: ''},
      {value: this.person.proEmail, dirty: false, class: '', error: ''},
      {value: this.person.salutation, dirty: false, class: '', error: ''},
      {value: this.person.socialSecurityNumber, dirty: false, class: '', error: ''},
      {value: this.person.state, dirty: false, class: '', error: ''},
      {value: this.person.status, dirty: false, class: '', error: ''},
      {value: this.person.uuid, dirty: false, class: '', error: ''},
      {value: this.person.nationality, dirty: false, class: '', error: ''},
      {value: this.person.leavingreason, dirty: false, class: '', error: ''},
      {value: this.person.hearing_reason, dirty: false, class: '', error: ''},
      {value: this.person.isDeleted, dirty: false, class: '', error: ''},
      {value: this.person.created, dirty: false, class: '', error: ''},
      new CollaboratorBankAccount(
        {value: this.person.collaboratorBankAccount.uuid, dirty: false, class: '', error: ''},
        {value: this.person.collaboratorBankAccount.accountnumber, dirty: false, class: '', error: ''},
        {value: this.person.collaboratorBankAccount.bankname, dirty: false, class: '', error: ''},
      ),
      true,
      {value: this.person.civilState, dirty: false, class: '', error: ''},
      {value: this.person.dateOfCin, dirty: false, class: '', error: ''},
      {value: this.person.attachementCinBack, dirty: false, class: '', error: ''},
      {value: this.person.attachementCinFront, dirty: false, class: '', error: ''},
      new TeamModel(
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {value: '', dirty: false, class: '', error: ''},
        {
          uuid: {value: '', dirty: false, class: '', error: ''},
        }
      ),
      {value: this.person.teamBoss, dirty: false, class: '', error: ''},
    );
    this.uuid = this.person.uuid;
    this.nationalities = this.nationalitiesService.nationalities;
    this.leaveService.getAllLeaveRules().subscribe(response => {
      const list = response;
      // this.sickLeaveRulesList = list.sickLeave_rule.value();
      // this.payedLeaveRulesList = list.payed_rule.value();

      list.forEach(elt => {
        const splitted = elt.value.split(',', 12);
        const sum = splitted.reduce((a, b) => a + Number(b), 0).toFixed(2);
        this.congeRulesList.push(
          { isdefault: elt.is_default,
            name: elt.name,
            leave: elt.leave,
            value: elt.value,
            uuid: elt.uuid,
            total: sum,
            listleaveperday: splitted
          }
        );
        this.ref.detectChanges();
        if (elt.leave.type === 'SICK_LEAVE') {
          this.sickLeaveRulesList.push(
            { item_id: elt.uuid,
              item_text: elt.name,
            }
          );
        }
        if (elt.leave.type === 'PAYED_LEAVE') {
          this.payedLeaveRulesList.push(
            { item_id: elt.uuid,
              item_text: elt.name,
            }
          );
        }
      });

      this.ref.detectChanges();
    });

    this.leaveService.getAllLeaveByCollaboratorbyUuid(this.uuid).subscribe(response => {
      const elt = response.payed_rule;
      if (elt != null) {
      const splitted = elt.value.split(',', 12);
      const sum = splitted.reduce((a, b) => a + Number(b), 0).toFixed(2);
      this.payedLeaveRules = {
        isdefault: elt.is_default,
        name: elt.name,
        leave: elt.leave,
        value: elt.value,
        uuid: elt.uuid,
        total: sum,
        listleaveperday: splitted
      };
      this.leaveRules.push(this.payedLeaveRules);
    }
      const elt1 = response.sickLeave_rule;
      if (elt1 != null) {
        const splitted1 = elt1.value.split(',', 12);
        const sum1 = splitted1.reduce((a, b) => a + Number(b), 0).toFixed(2);
        this.sickLeaveRules = {
          isdefault: elt1.is_default,
          name: elt1.name,
          leave: elt1.leave,
          value: elt1.value,
          uuid: elt1.uuid,
          total: sum1,
          listleaveperday: splitted1
        };
        this.leaveRules.push(this.sickLeaveRules);
      }
      // response.rules.forEach(elt => {
      //   if (elt.leave.type === 'PAYED_LEAVE') { this.payedLeaveRules = elt; }
      //   else if (elt.leave.type === 'SICK_LEAVE') { this.sickLeaveRules = elt; }
      // });
    });
    this.contractService.getContratByCollaborator(this.uuid).subscribe(response => {
      this.contratListByCollaborator = response;
    });
    this.contractService.getAllContractType().subscribe(response => {
        this.contractTypeList = [];
        response.forEach(elt => {
          this.contractTypeList.push({
            name: elt.type,
            id: elt.id
          });
        });
        this.ref.detectChanges();
      }
    );
    this.contractService.getAllContractDuration().subscribe(response => {
        this.contractDurationList = [];
        response.forEach(elt => {
            this.contractDurationList.push({
              duation: elt.duation + '' + elt.unit,
              id: elt.id
            });
            this.ref.detectChanges();
          }
        );
      }
    );
    this.contractService.getAllContractDocument().subscribe(response => {
        this.contractDocumentList = response;
      }
    );
  }

  onFormContratSubmit() {
    // this.validateRequiredInputContratForm();
    // if (!this.ContratFormIsValid()) {
    //   const shadesEl2 = document.querySelector('.alert-danger-contrat');
    //   shadesEl2.classList.add('show');
    //   return;
    // } else {
      this.submitContratForm();
    // }
  }

  private submitContratForm() {
    this.createSalaryFinished.next(false);
    this.createTrialFinished.next(false);
    this.contractService
      .createSalary( {
        baseSalary: this.salary.baseSalary,
        monthlySchedule: this.salary.monthlySchedule,
        id: ''
      }).subscribe(response => {
        this.newSalary = response;
        this.createSalaryFinished.next(true);
      }
    );
    this.createSalaryFinished.subscribe(value => {
      if (value) {
        this.contractService
          .createTrial( {
            duation: this.trialPeriod.duation,
            unit: this.trialPeriod.unit,
            id: ''
          }).subscribe(response => {
            this.newTrial = response;
            this.createTrialFinished.next(true);
          }
        );
      }
    });
    this.createTrialFinished.subscribe(value => {
      if (value) {
        this.contractService
          .createContract({
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
              uuid: this.person.uuid,
            },
            contractDocument: {uuid: this.document.uuid},
            contractType: {
              // description: '',
              id: this.collaboratorContract.contractType.id.value,
              // type: ''
            },
            duration: this.collaboratorContract.duration.value,
            unit_duration: this.collaboratorContract.unit_duration.value,
            // contractStatus: 'ACTIVE',
            hiringDate: moment(new Date()).format('YYYY-MM-DD'),
            id: 0,
            ref: '',
            salary: {
              id: this.newSalary.id
            },
            trialPeriod: {
             id: this.newTrial.id
            },
            title: this.collaboratorContract.title.value
          }).subscribe(response => {
          // tslint:disable-next-line:no-unused-expression
          document.querySelector('.alert-danger-contrat').classList.remove('show');
          const shadesEl = document.querySelector('.alert-success-contrat');
          shadesEl.classList.add('show');
          const a = (document.getElementById('formcontrat') as HTMLFormElement);
          a.reset();
          setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
          this.contratListByCollaborator[this.contratListByCollaborator.length - 1].contractStatus = 'INACTIVE';
          this.contratListByCollaborator.push(response);
        });
      }
    });
  }

  // private ContratFormIsValid() {
  //       if ((this.collaboratorContract.contractType.id.dirty) || (this.collaboratorContract.contractDuration.id.dirty)) {
  //         this.collaboratorContract.isValid = false;
  //       } else {
  //         this.collaboratorContract.isValid = true;
  //         const shadesEl2 = document.querySelector('.alert-danger-contrat');
  //         shadesEl2.classList.remove('show');
  //       }
  //       return this.collaboratorContract.isValid;
  // }

  private validateRequiredInputContratForm() {
    if (this.collaboratorContract.contractType.id.value === '') {
      this.collaboratorContract.contractType.id.dirty = true;
      this.collaboratorContract.contractType.id.class = 'invalid';
      this.collaboratorContract.contractType.id.error = 'Contract Type should not be empty';
    } else {
      this.collaboratorContract.contractType.id.dirty = false;
      this.collaboratorContract.contractType.id.class = 'valid';
      this.collaboratorContract.contractType.id.error = '';
    }
    if (this.selectedelt === 'CDD') {
      if (this.collaboratorContract.duration.value === '') {
      this.collaboratorContract.duration.dirty = true;
      this.collaboratorContract.duration.class = 'invalid';
      this.collaboratorContract.duration.error = 'Duation should not be empty';
    } else {
      this.collaboratorContract.duration.dirty = false;
      this.collaboratorContract.duration.class = 'valid';
      this.collaboratorContract.duration.error = '';
    }
    } else if  (this.selectedelt === 'CDI') {
        this.collaboratorContract.duration.value = '+∞';
    }
  }
  selectType(event: any, id: any) {
    const eventclass = event.target as HTMLInputElement;
    this.selectedelt = '';
    this.contractTypeList.forEach(elt => {
      if (elt.id.toString() === eventclass.value) {
        this.selectedelt = elt.name;
      }
    });
    if (this.selectedelt === 'CDD') {
      const shadesEl2 = document.querySelector('.contrat_duration');
      shadesEl2.classList.add('show');        } else  if (this.selectedelt === 'CDI') {
      const shadesEl2 = document.querySelector('.contrat_duration');
      shadesEl2.classList.remove('show');
      document.querySelector('.req1').removeAttribute('required');
      this.collaboratorContract.duration.value = '+∞'; }
  }
  open(content) {
    this.modalService.open(content, {size: 'xl'});
  }

  onFormSubmit() {
    const a = this.leaveRulesModel.sickRuleuuid;
    const b = this.payedLeaveRulesList;
    const c = this.sickLeaveRulesList;
    // if (this.payedLeaveRules != null) {
    //   this.leaveService.revokeRulesForCollaborator({uuid: this.uuid, rule_uuid: this.payedLeaveRules.uuid} ).subscribe(response => {
    //     console.log(response);
    //   });
    // }
    // if (this.sickLeaveRules != null) {
    //   this.leaveService.revokeRulesForCollaborator({uuid: this.uuid, rule_uuid: this.sickLeaveRules.uuid}).subscribe(response => {
    //     console.log(response);
    //   });
    // }
    this.leaveService.assignRulesForCollaborator(
      {uuid: this.uuid, sick_uuid: this.leaveRulesModel.sickRuleuuid, payed_uuid: this.leaveRulesModel.payedRuleuuid} )
      .subscribe(response => {
        console.log(response);
        this.leaveRules = [];
        const elt = response.payed_rule;
        if (elt != null) {
          const splitted = elt.value.split(',', 12);
          const sum = splitted.reduce((e, d) => e + Number(d), 0).toFixed(2);
          this.payedLeaveRules = {
            isdefault: elt.is_default,
            name: elt.name,
            leave: elt.leave,
            value: elt.value,
            uuid: elt.uuid,
            total: sum,
            listleaveperday: splitted
          };
          this.leaveRules.push(this.payedLeaveRules);
        }
        const elt1 = response.sickLeave_rule;
        if (elt1 != null) {
          const splitted1 = elt1.value.split(',', 12);
          const sum1 = splitted1.reduce((e, d) => e + Number(d), 0).toFixed(2);
          this.sickLeaveRules = {
            isdefault: elt1.is_default,
            name: elt1.name,
            leave: elt1.leave,
            value: elt1.value,
            uuid: elt1.uuid,
            total: sum1,
            listleaveperday: splitted1
          };
          this.leaveRules.push(this.sickLeaveRules);
        }
        // response.rules.forEach(elt => {
        //   if (elt.leave.type === 'PAYED_LEAVE') { this.payedLeaveRules = elt; }
        //   else if (elt.leave.type === 'SICK_LEAVE') { this.sickLeaveRules = elt; }
        // });
        // add class show alert
        const shadesEl = document.querySelector('.alert-success-rule');
        shadesEl.classList.add('show');
    });
    // tslint:disable-next-line:max-line-length
    // this.leaveService.assignRulesForCollaborator({uuid: this.uuid, rule_uuid: this.leaveRulesModel.payedRuleuuid} ).subscribe(response => {
    //   console.log(response);
    //   // add class show alert
    //   const shadesEl = document.querySelector('.alert-success');
    //   shadesEl.classList.add('show');
    // });
  }

  private submitForm() {
    this.ListRulesSelected = [];
    this.ListRulesSelected.push(this.sickLeaveRules);
    this.ListRulesSelected.push(this.payedLeaveRules);
    this.leaveService.createRulesForCollaborator(
          {
            collaborator: this.person.uuid,
            rules:  this.ListRulesSelected
          }
        ).subscribe(response => {
          console.log(response);

        });
  }

  private FormIsValid() {
    // for (const element in this.collaborator) {
    //   if (this.collaborator[element].dirty) {
    //     this.collaborator.isValid = false;
    //     break;
    //   } else {
    //     this.collaborator.isValid = true;
    //     const shadesEl2 = document.querySelector('.alert-danger');
    //     shadesEl2.classList.remove('show');
    //   }
    // }
    // return this.collaborator.isValid;
    if (this.collaboratorResult.isValid) {
      return true;
    } else {
      return false;
    }
  }


  private validateRequiredInputForm() {
    this.collaboratorResult.isValid = true;
    if (this.collaboratorResult.salutation.value === '') {
      this.collaboratorResult.salutation.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.salutation.error = 'salutation est obligatoire';
    } else {
      this.collaboratorResult.salutation.dirty = false;
      this.collaboratorResult.salutation.error = '';
    }
    if (this.collaboratorResult.lastname.value === '') {
      this.collaboratorResult.lastname.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.lastname.error = 'Nom est obligatoire';
    } else {
      this.collaboratorResult.lastname.dirty = false;
      this.collaboratorResult.lastname.error = '';
    }
    if (this.collaboratorResult.firstname.value === '') {
      this.collaboratorResult.firstname.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.firstname.error = 'Prénom est obligatoire';
    } else {
      this.collaboratorResult.firstname.dirty = false;
      this.collaboratorResult.firstname.error = '';
    }
    // if (this.collaboratorResult.country.value === '') {
    //   this.collaboratorResult.country.dirty = true;
    //   this.collaboratorResult.isValid = false;
    //   this.collaboratorResult.country.class = 'invalid';
    //   this.collaboratorResult.country.error = 'country should not be empty';
    // } else {
    //   this.collaboratorResult.country.dirty = false;
    //   this.collaboratorResult.country.class = 'valid';
    //   this.collaboratorResult.country.error = '';
    // }
    if (this.collaboratorResult.status.value === '') {
      this.collaboratorResult.status.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.status.error = 'Status est obligatoire';
    } else {
      this.collaboratorResult.status.dirty = false;
      this.collaboratorResult.status.error = '';
    }
    if (this.collaboratorResult.collaboratorBankAccount.accountnumber.value.length !== 20) {
      this.collaboratorResult.collaboratorBankAccount.accountnumber.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.collaboratorBankAccount.accountnumber.error = 'Le numero de compte bancaire est obligatoire et doit etre 20 chiffres';
    } else {
      this.collaboratorResult.collaboratorBankAccount.accountnumber.dirty = false;
      this.collaboratorResult.collaboratorBankAccount.accountnumber.error = '';
    }
    if (this.collaboratorResult.dateOfBirth.value === null) {
      this.collaboratorResult.dateOfBirth.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.dateOfBirth.error = 'Date de naissance est obligatoire';
    } else {
      this.collaboratorResult.dateOfBirth.dirty = false;
      this.collaboratorResult.dateOfBirth.error = '';
    }
    if (this.collaboratorResult.collaboratorBankAccount.bankname.value === '') {
      this.collaboratorResult.collaboratorBankAccount.bankname.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.collaboratorBankAccount.bankname.error = 'Nom de banque est obligatoire';
    } else {
      this.collaboratorResult.collaboratorBankAccount.bankname.dirty = false;
      this.collaboratorResult.collaboratorBankAccount.bankname.error = '';
    }
    if (this.collaboratorResult.address.value === '') {
      this.collaboratorResult.address.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.address.error = 'Addresse est obligatoire';
    } else {
      this.collaboratorResult.address.dirty = false;
      this.collaboratorResult.address.error = '';
    }
    if (this.collaboratorResult.city.value === '') {
      this.collaboratorResult.city.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.city.error = 'Ville est obligatoire';
    } else {
      this.collaboratorResult.city.dirty = false;
      this.collaboratorResult.city.error = '';
    }
    if (this.collaboratorResult.socialSecurityNumber.value.toString().length !== 10) {
      this.collaboratorResult.socialSecurityNumber.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.socialSecurityNumber.error = 'Le numero de securité sociale est obligatoire est obligatoire et doit etre 10 chiffres';
    } else {
      this.collaboratorResult.socialSecurityNumber.dirty = false;
      this.collaboratorResult.socialSecurityNumber.error = '';
    }
    if (this.collaboratorResult.idCardNumber.value.length !== 8) {
      this.collaboratorResult.idCardNumber.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.idCardNumber.error = 'CIN est obligatoire est obligatoire et doit etre 8 chiffres';
    } else {
      this.collaboratorResult.idCardNumber.dirty = false;
      this.collaboratorResult.idCardNumber.error = '';
    }
    if (this.collaboratorResult.mobileNumber.value.length !== 8) {
      this.collaboratorResult.mobileNumber.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.mobileNumber.error = 'Le numero de téléphone  est obligatoire et doit etre 8 chiffres';
    } else {
      this.collaboratorResult.mobileNumber.dirty = false;
      this.collaboratorResult.mobileNumber.error = '';
    }
    if (this.collaboratorResult.dateOfCin.value === null) {
      this.collaboratorResult.dateOfCin.dirty = true;
      this.collaboratorResult.isValid = false;
      this.collaboratorResult.dateOfCin.error = 'Date de validation de CIN  est obligatoire ';
    } else {
      this.collaboratorResult.dateOfCin.dirty = false;
      this.collaboratorResult.dateOfCin.error = '';
    }

  }
  valider() {
    // document.querySelector('.butt1').click();
    this.stepUpdateProfile();
    this.stepAffectContract();
    this.stepAssignRules();
  }

  stepUpdateProfile() {
      this.validateRequiredInputForm();
      if (!this.FormIsValid()) {
        document.querySelector('.alert-success-profile').classList.remove('show');
        const shadesEl2 = document.querySelector('.alert-danger-update');
        shadesEl2.classList.add('show');
        return;
      } else {
        this.update();
      }
    // const myForm2 = document.getElementById('form2') as HTMLFormElement;
    // myForm2.click();
    // if (myForm2.checkValidity()) {
    // this.update();
    // } else if (!myForm2.checkValidity()) {
    //   const shadesEl2 = document.querySelector('.alert-danger-profile');
    //   shadesEl2.classList.add('show');
    // }
  }
  stepAffectContract() {
    const myForm = document.getElementById('formcontrat') as HTMLFormElement;
    if (myForm.checkValidity()) {
      this.onFormContratSubmit();
    } else {
      const b = document.getElementById('formcontrat')[1].value;
      const c = document.getElementById('formcontrat')[2].value;
      const d = document.getElementById('formcontrat')[3].value;
      const f = document.getElementById('formcontrat')[7].value;
      const g = document.getElementById('formcontrat')[9].value;
      const arr = [];
      let i = 0;
      arr.push(b, c, d, f, g);
      arr.forEach(elt => {
        if (elt === '') {
          i++;
        }
      });
      if (i === 1 || i === 2 || i === 3 || i === 4 ) {
        const shadesEl2 = document.querySelector('.alert-danger-contrat');
        shadesEl2.classList.add('show');
        const shadesEl = document.querySelector('.alert-success-contrat');
        shadesEl.classList.remove('show');
      }
    }
  }
  stepAssignRules() {
    const a = this.leaveRulesModel.sickRuleuuid;
    const b = this.leaveRulesModel.payedRuleuuid;
    if (this.leaveRulesModel.sickRuleuuid === '' &&  this.leaveRulesModel.payedRuleuuid !== '') {
      this.leaveRulesModel.sickRuleuuid = this.sickLeaveRules.uuid;
      this.onFormSubmit();
    } else  if (this.leaveRulesModel.payedRuleuuid === '' && this.leaveRulesModel.sickRuleuuid !== '') {
      this.leaveRulesModel.payedRuleuuid = this.payedLeaveRules.uuid;
      this.onFormSubmit();
    } else if (this.leaveRulesModel.sickRuleuuid !== '' &&  this.leaveRulesModel.payedRuleuuid !== '') {
      this.onFormSubmit();
    }
  }

  update() {
    const currentCollaborator =  this.collaboratorResult;
    const collaboratortoUpdated = {
      address:  this.collaboratorResult.address.value,
      city: this.collaboratorResult.city.value,
      country: this.collaboratorResult.country.value,
      dateOfBirth: this.collaboratorResult.dateOfBirth.value,
      faxNumber: this.collaboratorResult.faxNumber.value,
      firstname: this.collaboratorResult.firstname.value,
      idCardNumber: this.collaboratorResult.idCardNumber.value,
      lastname: this.collaboratorResult.lastname.value,
      maidenName: this.collaboratorResult.maidenName.value,
      matricule: this.collaboratorResult.matricule.value,
      mobileNumber: this.collaboratorResult.mobileNumber.value,
      passportId: this.collaboratorResult.passportId.value,
      personalEmail: this.collaboratorResult.personalEmail.value,
      personalPicture:  this.url ,
      phoneNumber: this.collaboratorResult.phoneNumber.value,
      postalCode: this.collaboratorResult.postalCode.value,
      proEmail: this.collaboratorResult.proEmail.value,
      salutation: this.collaboratorResult.salutation.value,
      socialSecurityNumber: this.collaboratorResult.socialSecurityNumber.value,
      state: this.collaboratorResult.state.value,
      status: this.collaboratorResult.status.value,
      uuid: this.collaboratorResult.uuid.value,
      nationality: this.collaboratorResult.nationality.value,
      created: this.collaboratorResult.created.value,
      collaboratorBankAccount:
        {
          uuid: this.collaboratorResult.collaboratorBankAccount.uuid.value,
          accountnumber: this.collaboratorResult.collaboratorBankAccount.accountnumber.value,
          bankname: this.collaboratorResult.collaboratorBankAccount.bankname.value
        },
      id: this.collaboratorResult.id.value,
      civilState: this.collaboratorResult.civilState.value,
      dateOfCin: this.collaboratorResult.dateOfCin.value,
      attachementCinBack: this.collaboratorResult.attachementCinBack.value,
      attachementCinFront: this.collaboratorResult.attachementCinFront.value,
      team: null,
      teamBoss:  this.collaboratorResult.teamBoss.value,
    };
    const a = JSON.stringify(this.firstcollaboratorResult);
    const b = JSON.stringify(currentCollaborator);
    if ((JSON.stringify(this.firstcollaboratorResult)) !== (JSON.stringify(currentCollaborator))) {
      this.sirhService.ModifyProfile(collaboratortoUpdated).subscribe(response => {
      this.person = response;
      // this.router.navigateByUrl('/dashboard/admin/profile');
      document.querySelector('.alert-danger-update').classList.remove('show');
      document.querySelector('.alert-danger-profile').classList.remove('show');
      const shadesEl = document.querySelector('.alert-success-profile');
      shadesEl.classList.add('show');
      this.valueUpdate.emit(this.person);
      }); }
  }


  openDocument(contentdocument, id) {
    this.modalService.open(contentdocument, {size: 'xl'});
  }
}

