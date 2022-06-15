import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {CollaboratorBankAccount} from '../../../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {CollaboratorModel} from '../../../../shared/model/response-payload/collaborators/collaborator-model';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {AuthService} from '../../../../shared/services/back-end/auth/auth.service';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {TeamModel} from "../../../../shared/model/response-payload/collaborators/teams/team";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dash-default',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../dash-main/dash-main.component.css']
})
export class ProfileComponent implements OnInit {
  form: WindForm = new WindForm([
    new WindFormElement('address', '', 'text', [Validators.required, Validators.min(4)], 'address'),
    new WindFormElement('city', '', 'text', [Validators.required, Validators.min(4)], 'city'),
    new WindFormElement('country', '', 'text', [Validators.required, Validators.min(4)], 'country'),
    new WindFormElement('dateOfBirth', '', 'text', [Validators.required, Validators.min(4)], 'dateOfBirth'),
    new WindFormElement('faxNumber', '', 'text', [Validators.required, Validators.min(4)], 'faxNumber'),
    new WindFormElement('firstname', '', 'text', [Validators.required, Validators.min(4)], 'firstname'),
    new WindFormElement('idCardNumber', '', 'text', [Validators.required, Validators.min(4)], 'idCardNumber'),
    new WindFormElement('lastname', '', 'text', [Validators.required, Validators.min(4)], 'lastname'),
    new WindFormElement('maidenName', '', 'text', [Validators.required, Validators.min(4)], 'maidenName'),
    new WindFormElement('matricule', '', 'text', [Validators.required, Validators.min(4)], 'matricule'),
    new WindFormElement('mobileNumber', '', 'text', [Validators.required, Validators.min(4)], 'mobileNumber'),
    new WindFormElement('passportId', '', 'text', [Validators.required, Validators.min(4)], 'passportId'),
    new WindFormElement('personalEmail', '', 'text', [Validators.required, Validators.min(4)], 'personalEmail'),
    new WindFormElement('personalPicture', '', 'text', [Validators.required, Validators.min(4)], 'personalPicture'),
    new WindFormElement('phoneNumber', '', 'text', [Validators.required, Validators.min(4)], 'phoneNumber'),
    new WindFormElement('postalCode', '', 'text', [Validators.required, Validators.min(4)], 'postalCode'),
    new WindFormElement('proEmail', '', 'text', [Validators.required, Validators.min(4)], 'proEmail'),
    new WindFormElement('salutation', '', 'text', [Validators.required, Validators.min(4)], 'salutation'),
    new WindFormElement('socialSecurityNumber', '', 'text', [Validators.required, Validators.min(4)], 'socialSecurityNumber'),
    new WindFormElement('state', '', 'text', [Validators.required, Validators.min(4)], 'state'),
    new WindFormElement('status', '', 'text', [Validators.required, Validators.min(4)], 'status'),
    new WindFormElement('uuid', '', 'text', [Validators.required, Validators.min(4)], 'uuid'),
  ]);
  name = 'Angular 4';
  url: string | ArrayBuffer = '';
  congeRulesList: Array<any> = [];
  currentRule: any;
  collaboratorResult: CollaboratorModel = new CollaboratorModel(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value:  moment().toDate(), dirty: false, class: '', error: ''},
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
  sickLeaveRules: any;
  payedLeaveRules: any;
  currentuuid: any;
  constructor(private logger: NGXLogger,
              private sirhService: CollaboratorService,
              public router: Router,
              private leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private modalService: NgbModal,
              private authService: AuthService,
              ) {
  }

  ngOnInit(): void {
    if (this.authService.connectedUser != null ) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) { this.currentuuid = this.sirhService.uuid.access_id; }
    this.leaveService.getAllLeaveByCollaboratorbyUuid(this.currentuuid).subscribe(response => {
      // response.rules.forEach(elt => {
      //   if (elt.leave.type === 'PAYED_LEAVE') { this.payedLeaveRules = elt.name; }
      //   else if (elt.leave.type === 'SICK_LEAVE') { this.sickLeaveRules = elt.name; }
      // });
      this.sickLeaveRules = response.sickLeave_rule.name;
      this.payedLeaveRules = response.payed_rule.name;
    });
    this.sirhService.getCollaborator(this.currentuuid).subscribe(response => {
      this.collaboratorResult = {
        address: { value: response.address, dirty: false, class: '', error: '' },
        city: { value: response.city, dirty: false, class: '', error: '' },
        country: { value: response.country, dirty: false, class: '', error: '' },
        id: { value: response.id, dirty: false, class: '', error: '' },
        dateOfBirth: { value: response.dateOfBirth, dirty: false, class: '', error: '' },
        faxNumber: { value: response.faxNumber, dirty: false, class: '', error: '' },
        firstname: { value: response.firstname, dirty: false, class: '', error: '' },
        idCardNumber: { value: response.idCardNumber, dirty: false, class: '', error: '' },
        lastname: { value: response.lastname, dirty: false, class: '', error: '' },
        maidenName: { value: response.maidenName, dirty: false, class: '', error: '' },
        matricule: { value: response.matricule, dirty: false, class: '', error: '' },
        mobileNumber: { value: response.mobileNumber, dirty: false, class: '', error: '' },
        passportId: { value: response.passportId, dirty: false, class: '', error: '' },
        personalEmail: { value: response.personalEmail, dirty: false, class: '', error: '' },
        personalPicture: { value: response.personalPicture, dirty: false, class: '', error: '' },
        phoneNumber: { value: response.phoneNumber, dirty: false, class: '', error: '' },
        postalCode: { value: response.postalCode, dirty: false, class: '', error: '' },
        proEmail: { value: response.proEmail, dirty: false, class: '', error: '' },
        salutation: { value: response.salutation, dirty: false, class: '', error: '' },
        socialSecurityNumber: { value: response.socialSecurityNumber, dirty: false, class: '', error: '' },
        state: { value: response.state, dirty: false, class: '', error: '' },
        status: { value: response.status, dirty: false, class: '', error: '' },
        uuid: { value: response.uuid, dirty: false, class: '', error: '' },
        nationality: { value: response.nationality, dirty: false, class: '', error: '' },
        leavingreason: { value: response.leavingreason, dirty: false, class: '', error: '' },
        hearing_reason: { value: response.hearing_reason, dirty: false, class: '', error: '' },
        isDeleted: { value: response.isDeleted, dirty: false, class: '', error: '' },
        created: {value: null, dirty: false, class: '', error: ''},
        collaboratorBankAccount:
          {
            uuid: {value: '', dirty: false, class: '', error: ''},
            accountnumber: {value: '', dirty: false, class: '', error: ''},
            bankname: {value: '', dirty: false, class: '', error: ''}
          },
        isValid: true,
        civilState: { value: response.civilState, dirty: false, class: '', error: '' },
        dateOfCin: { value: response.dateOfCin, dirty: false, class: '', error: '' },
        attachementCinBack: { value: response.attachementCinBack, dirty: false, class: '', error: '' },
        attachementCinFront: { value: response.attachementCinFront, dirty: false, class: '', error: '' },
        team: {
          uuid: {value: response.TeamModel.uuid, dirty: false, class: '', error: '' },
          description: {value: response.TeamModel.description, dirty: false, class: '', error: '' },
          label: {value: response.TeamModel.label, dirty: false, class: '', error: '' },
          managerteam: {
            uuid: {value: response.TeamModel.managerteam.uuid, dirty: false, class: '', error: '' }
          }
        },
        teamBoss: {value: response.teamBoss, dirty: false, class: '', error: ''},
      };
      this.ref.detectChanges(); }
    );
    console.log(this.collaboratorResult);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  update() {
    const currentCollaborator = {
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
      personalPicture: this.collaboratorResult.personalPicture.value,
      phoneNumber: this.collaboratorResult.phoneNumber.value,
      postalCode: this.collaboratorResult.postalCode.value,
      proEmail: this.collaboratorResult.proEmail.value,
      salutation: this.collaboratorResult.salutation.value,
      socialSecurityNumber: this.collaboratorResult.socialSecurityNumber.value,
      state: this.collaboratorResult.state.value,
      status: this.collaboratorResult.status.value,
      uuid: this.collaboratorResult.uuid.value,
      id: this.collaboratorResult.id.value,
    };
    this.sirhService.ModifyProfile(currentCollaborator).subscribe(() => {
      this.router.navigateByUrl('/dashboard/admin/profile');
    });
  }

  onSelectAddNew(rule: any) {
    const event = rule.target as HTMLInputElement;
    if (event.value === 'new') {
      this.router.navigateByUrl('/dashboard/admin/conge/companyenabledrule');
    } else {
      this.currentRule = this.congeRulesList.find(elt => elt.uuid === event.value);
      const shadesEl2 = document.querySelector('.delete');
      document.querySelector('.custom-width').classList.add('custom-width-show');
      shadesEl2.classList.add('show');
    }
  }
  close(content) {
    this.modalService.dismissAll(content);
  }

  open(content: any) {
    this.modalService.open(content);
  }
  openRule(content: any) {
    this.modalService.open(content);
  }
}
