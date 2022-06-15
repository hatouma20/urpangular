import {resolveFileWithPostfixes} from '@angular/compiler-cli/ngcc/src/utils';
import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Route, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import * as moment from 'moment';
import {BehaviorSubject, Subject} from 'rxjs';
import {timeout} from 'rxjs/operators';
import {CollaboratorBankAccount} from '../../../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {CollaboratorModel} from '../../../../shared/model/response-payload/collaborators/collaborator-model';
import {Companyleaverule} from '../../../../shared/model/response-payload/collaborators/congé/companyleaverule';
import {ContractDocument} from '../../../../shared/model/response-payload/collaborators/contrat/contract-document';
import {ContractDurationDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-DurationDto';
import {ContractTypeDto} from '../../../../shared/model/response-payload/collaborators/contrat/contract-TypeDto';
import {ContratModel} from '../../../../shared/model/response-payload/collaborators/contrat/contrat-model';
import {HiringReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/hiring-ReasonDto';
import {LeavingJobReasonDto} from '../../../../shared/model/response-payload/collaborators/contrat/leaving-Job-ReasonDto';
import {SalaryDto} from '../../../../shared/model/response-payload/collaborators/contrat/salaryDto';
import {TimeQuota} from '../../../../shared/model/response-payload/collaborators/contrat/time-Quota';
import {TrialPeriodDto} from '../../../../shared/model/response-payload/collaborators/contrat/trial-Period-Dto';
import {TeamModel} from '../../../../shared/model/response-payload/collaborators/teams/team';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {TeamsService} from '../../../../shared/services/back-end/teams/teams.service';
import {NationalitiesService} from '../../../../shared/services/nationalities/nationalities';

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'wind-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['collaborators.component.css'],
  styles: [
      `
         `
  ]})
export class CollaboratorsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  url: string | ArrayBuffer = '';
  urlFace: string | ArrayBuffer = '';
  urlPile: string | ArrayBuffer = '';
  shadesE2: any;
  shadesEl: any;
  collaboratorSearch = {
  cin: '',
  team: '',
  isdeleted: null,
  matricule: ''
  };
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private createCollaboratorFinished = new BehaviorSubject(null);
  private conste = new BehaviorSubject(false);
  private readdCollaborator = new BehaviorSubject(false);
  contratListByCollaborator: Array<any> = [];
  ListRulesSelected = [];
  coll: any = [];
  uuidformdata: any;
  disabled = false;
  contractDurationList: Array<any> = [];
  contractTypeList: Array<any> = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  companyLeaveRule: Companyleaverule = new Companyleaverule(
    {value: true, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    null,
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
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
  collaborator: CollaboratorModel = new CollaboratorModel(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: moment().toDate(), dirty: false, class: '', error: ''},
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
  );
  sickLeaveRules = {
    uuid: '',
    name: ''
  };
  payedLeaveRules = {
    uuid: '',
    name: ''
  };
  rule = false;
  congeRulesList: Array<any> = [];
  editField: string;
  // url: string | ArrayBuffer = '';
  collaboratorsList: Array<any> = [];
  payedLeaveRulesList = [];
  sickLeaveRulesList = [];
  currentSickRule: any;
  teamsList: any = [];
  currentPayedRule: any;
  nationalities: any;
  newCollaboratorCreated: any;


  Personnelpicture: any;
  FileSelectPile: any;
  FileSelectFace: any;


  formData = new FormData();

  constructor(private sirhService: CollaboratorService,
              private contractService: ContractService,
              private modalService: NgbModal,
              private ref: ChangeDetectorRef,
              private leaveService: LeavesService,
              private router: Router,
              private nationalitiesService: NationalitiesService,
              private teamsService: TeamsService,
  ) {
  }

  ngOnInit(): void {
    this.teamsService.getAllTeam().subscribe(response => {
      this.teamsList = response;
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      order: [[13, 'asc']]   // '0' is the table column(1st column) and 'desc' is the sorting order
    };
    this.nationalities = this.nationalitiesService.nationalities;
    this.leaveService.getAllLeaveRules().subscribe(response => {
      const list = response;
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
        this.ref.detectChanges(); });
    });
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

    // this.sirhService.getAllCollaborators().subscribe(response => {
    //   this.collaboratorsList = response;
    //   this.ref.detectChanges();
    //   this.dtTrigger.next();
    // })
    this.sirhService.filterCollaborator('', '', '', false ).subscribe(response => {
      this.collaboratorsList = response;
      this.ref.detectChanges();
      this.dtTrigger.next();
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // scrollX: true,
      order: [[8, 'asc']]   // '0' is the table column(1st column) and 'desc' is the sorting order
    };
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.collaboratorsList[id][property] = editField;
    const currentCollaborator = this.collaboratorsList[id];
    this.sirhService.ModifyProfile(currentCollaborator).subscribe(response =>
      // window.location.reload()
      console.log(response)
    );
  }

  remove(id: number, property: string, event: any) {
    const collaboratortodeleted = this.collaboratorsList[id];
    collaboratortodeleted.leavingreason = this.collaborator.leavingreason.value;
    collaboratortodeleted.isDeleted = true;
    collaboratortodeleted.team = null;
    collaboratortodeleted.teamBoss = false;
    this.sirhService.deleteCollaborator(collaboratortodeleted).subscribe(response => {
          this.collaboratorsList[id].isDeleted = response.isDeleted;
          this.conste.next(true);
        });
    this.conste.subscribe(value => {
      if (value) {
        this.sirhService.filterCollaborator('', '', '', false ).subscribe(response => {
          this.collaboratorsList = response;
          this.modalService.dismissAll();
          this.collaborator.leavingreason.value = '';
          this.rerender();
        });
      }
    });
  }
  ReAdd(id: number) {
    const collaboratortodeleted = this.collaboratorsList[id];
    collaboratortodeleted.leavingreason = '';
    collaboratortodeleted.isDeleted = false;
    this.sirhService.deleteCollaborator(collaboratortodeleted).subscribe(response => {
        this.collaboratorsList[id].isDeleted = response.isDeleted;
        this.readdCollaborator.next(true);
    });
    this.readdCollaborator.subscribe(value => {
      if (value) {
        this.sirhService.filterCollaborator('', '', '', true ).subscribe(response => {
          this.collaboratorsList = response;
          this.rerender();
        });
      }
    });
  }
  openRule(content: any) {
    this.modalService.open(content,  {size: 'xl'});
  }

  openleavingReason(content: any, bool: boolean) {
    this.modalService.open(content,  {size: 'l', backdrop: 'static'});
  }
  open(content, uuid) {
    this.collaboratorContract.collaborator.uuid.value = uuid;

    this.contractService.getContratByCollaborator(uuid).subscribe(response => {
      this.contratListByCollaborator = response;
    });
    this.contractService.getContratByCollaborator(uuid).subscribe(response => {
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
    this.modalService.open(content,  {size: 'xxxl'});
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
  onFileSelectPile(event) {
    if (event.target.files.length > 0) {
      this.FileSelectPile = event.target.files[0];

    }
  }
  onFileSelectFace(event) {
    if (event.target.files.length > 0) {
      this.FileSelectFace = event.target.files[0];
    }
  }
  private submitForm() {
    this.createCollaboratorFinished.next(false);
    this.sirhService
      .createCollaborator(  {
        address: this.collaborator.address.value,
        city: this.collaborator.city.value,
        country: this.collaborator.country.value,
        dateOfBirth: moment(this.collaborator.dateOfBirth.value).format('YYYY-MM-DD'),
        faxNumber: this.collaborator.faxNumber.value,
        firstname: this.collaborator.firstname.value,
        idCardNumber: this.collaborator.idCardNumber.value,
        lastname: this.collaborator.lastname.value,
        maidenName: this.collaborator.maidenName.value,
        matricule: '',
        mobileNumber: this.collaborator.mobileNumber.value,
        passportId: this.collaborator.passportId.value,
        personalEmail: this.collaborator.personalEmail.value,
        personalPicture: null,
        phoneNumber: this.collaborator.phoneNumber.value,
        postalCode: this.collaborator.postalCode.value,
        proEmail: this.collaborator.proEmail.value,
        salutation: this.collaborator.salutation.value,
        socialSecurityNumber: this.collaborator.socialSecurityNumber.value,
        state: this.collaborator.state.value,
        status: this.collaborator.status.value,
        collaboratorBankAccount:
          {
            accountnumber:  this.collaborator.collaboratorBankAccount.accountnumber.value,
            bankname:  this.collaborator.collaboratorBankAccount.bankname.value
          },
        uuid: '',
        civilstate: this.collaborator.civilState.value,
        dateofcin: this.collaborator.dateOfCin.value,
        hearingreason: this.collaborator.hearing_reason.value,
        attachementCinBack: null,
        attachementCinFront: null,
        nationality: this.collaborator.nationality.value,
        deleted: false,
      } ).subscribe(response => {
        this.newCollaboratorCreated = response;


        this.uuidformdata = this.newCollaboratorCreated.uuid;
        this.formData.append('avatar', this.Personnelpicture);
        this.formData.append('rectcin', this.FileSelectFace);
        this.formData.append('verscin', this.FileSelectPile);
        this.createCollaboratorFinished.next(true);
      });
    this.ListRulesSelected = [];
    this.ListRulesSelected.push(this.sickLeaveRules);
    this.ListRulesSelected.push(this.payedLeaveRules);
    this.createCollaboratorFinished.subscribe(value => {

       // send picture to back
      if ( value === true) {
        this.sirhService.addpicture(this.formData, this.uuidformdata).subscribe(response => {
          console.log(response);
        });

      }

      this.shadesE2 = document.querySelector('.alert-danger');
      this.shadesEl = document.querySelector('.alert-success');
      if (value) {
        if (this.newCollaboratorCreated.uuid === null) {
          this.shadesEl.classList.remove('show');
          this.shadesE2.classList.add('show');
        } else {
          this.collaboratorsList.push(this.newCollaboratorCreated);
          this.shadesE2.classList.remove('show');
          this.shadesEl.classList.add('show');
          setTimeout(() => { this.shadesEl.classList.remove('show'); }, 3000);
        }
              // methode add file image back
      }
    });
    // add class show alert
  }

  private FormIsValid() {
    for (const element in this.collaborator) {
      if (this.collaborator[element].dirty) {
        this.collaborator.isValid = false;
        break;
      } else {
        this.collaborator.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.collaborator.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.collaborator.address.value === '') {
      this.collaborator.address.dirty = true;
      this.collaborator.address.class = 'invalid';
      this.collaborator.address.error = 'Description should not be empty';
    } else {
      this.collaborator.address.dirty = false;
      this.collaborator.address.class = 'valid';
      this.collaborator.address.error = '';
    }
    if (this.collaborator.city.value === '') {
      this.collaborator.city.dirty = true;
      this.collaborator.city.class = 'invalid';
      this.collaborator.city.error = 'Duation should not be empty';
    } else {
      this.collaborator.city.dirty = false;
      this.collaborator.city.class = 'valid';
      this.collaborator.city.error = '';
    }
    if (this.collaborator.nationality.value === '') {
      this.collaborator.nationality.dirty = true;
      this.collaborator.nationality.class = 'invalid';
      this.collaborator.nationality.error = 'nationality should not be empty';
    } else {
      this.collaborator.nationality.dirty = false;
      this.collaborator.nationality.class = 'valid';
      this.collaborator.nationality.error = '';
    }
    // if (this.collaborator.matricule.value === '') {
    //   this.collaborator.matricule.dirty = true;
    //   this.collaborator.matricule.class = 'invalid';
    //   this.collaborator.matricule.error = 'Matricule should not be empty';
    // } else {
    //   this.collaborator.matricule.dirty = false;
    //   this.collaborator.matricule.class = 'valid';
    //   this.collaborator.matricule.error = '';
    // }
    if (this.collaborator.salutation.value === '') {
      this.collaborator.salutation.dirty = true;
      this.collaborator.salutation.class = 'invalid';
      this.collaborator.salutation.error = 'Salutation should not be empty';
    } else {
      this.collaborator.salutation.dirty = false;
      this.collaborator.salutation.class = 'valid';
      this.collaborator.salutation.error = '';
    }
    if (this.collaborator.lastname.value === '') {
      this.collaborator.lastname.dirty = true;
      this.collaborator.lastname.class = 'invalid';
      this.collaborator.lastname.error = 'lastname should not be empty';
    } else {
      this.collaborator.lastname.dirty = false;
      this.collaborator.lastname.class = 'valid';
      this.collaborator.lastname.error = '';
    }
    if (this.collaborator.firstname.value === '') {
      this.collaborator.firstname.dirty = true;
      this.collaborator.firstname.class = 'invalid';
      this.collaborator.firstname.error = 'firstname should not be empty';
    } else {
      this.collaborator.firstname.dirty = false;
      this.collaborator.firstname.class = 'valid';
      this.collaborator.firstname.error = '';
    }
    if (this.collaborator.mobileNumber.value === '') {
      this.collaborator.mobileNumber.dirty = true;
      this.collaborator.mobileNumber.class = 'invalid';
      this.collaborator.mobileNumber.error = 'PhoneNumber should not be empty';
    } else {
      this.collaborator.mobileNumber.dirty = false;
      this.collaborator.mobileNumber.class = 'valid';
      this.collaborator.mobileNumber.error = '';
    }
    if (this.collaborator.dateOfBirth.value === null) {
      this.collaborator.dateOfBirth.dirty = true;
      this.collaborator.dateOfBirth.class = 'invalid';
      this.collaborator.dateOfBirth.error = 'Date of birth should not be empty';
    } else {
      this.collaborator.dateOfBirth.dirty = false;
      this.collaborator.dateOfBirth.class = 'valid';
      this.collaborator.dateOfBirth.error = '';
    }
  }

  onSelectAddNewsick(rule: any , content) {
    const event = rule.target as HTMLInputElement;
    if (event.value === 'new') {
      this.modalService.open(content,  {size: 'xxl'});
    } else {
      this.currentSickRule = this.congeRulesList.find(elt => elt.uuid === event.value);
      const shadesEl2 = document.querySelector('.show-sick');
      document.querySelector('.custom-width-sick').classList.add('custom-width-show');
      shadesEl2.classList.add('show');
    }
  }
  onSelectAddNewPayed(rule: any, content) {
    this.rule = true;
    const event = rule.target as HTMLInputElement;
    if (event.value === 'new') {
      this.modalService.open(content,  {size: 'xxl'});
    } else {
      this.currentPayedRule = this.congeRulesList.find(elt => elt.uuid === event.value);
      const shadesEl2 = document.querySelector('.show-payed');
      document.querySelector('.custom-width-payed').classList.add('custom-width-show');
      shadesEl2.classList.add('show');
    }
  }
  checkcin(event: any) {
    const editField = event.target.value;
    this.sirhService.checkcin(editField).subscribe(response => {
      console.log(response);
      if ( response === false) {
        document.querySelector('.showcheckcin').classList.add('show');
      } else {  document.querySelector('.showcheckcin').classList.remove('show'); }

    });
  }
  checkMatricule(event: any) {
    const editField = event.target.value;
    this.sirhService.checkmatricule(editField).subscribe(response => {
      console.log(response);
      if ( response === false) {
        document.querySelector('.showcheckmatricule').classList.add('show');
      } else {  document.querySelector('.showcheckmatricule').classList.remove('show'); }
    });
  }
  checkAccountNumber(event: any) {
    const editField = event.target.value;
    this.sirhService.checkAccountNumber(editField).subscribe(response => {
      console.log(response);
      if ( response === false) {
        document.querySelector('.showcheckAccountNumber').classList.add('show');
      } else {  document.querySelector('.showcheckAccountNumber').classList.remove('show'); }
    });
  }
  search() {
   const cin = this.collaboratorSearch.cin;
   const matricule = this.collaboratorSearch.matricule;
   let isdeleted;
   if (this.collaboratorSearch.isdeleted === '' || this.collaboratorSearch.isdeleted === null) {
      isdeleted = false;
   } else { isdeleted = this.collaboratorSearch.isdeleted; }
   const team = this.collaboratorSearch.team;
   this.sirhService.filterCollaborator(cin, matricule, team, isdeleted ).subscribe(response => {
      this.collaboratorsList = response;
      this.rerender();
    });
  }
  getUpdatedvalue($event, id) {
    console.log($event, id);
    this.collaboratorsList[id] = $event;
    // this.person = $event;
  }

  reloadrules(content) {
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
    this.modalService.dismissAll(content);
  }

  tester($event: MouseEvent) {
    console.log('aa');
  }

  close() {
    this.modalService.dismissAll();
    this.sirhService.filterCollaborator('', '', '', false ).subscribe(response => {
      this.collaboratorsList = response;
      this.rerender();
    });
  }
}
