import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject} from 'rxjs';
import {CollaboratorBankAccount} from '../../../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {CollaboratorModel} from '../../../../shared/model/response-payload/collaborators/collaborator-model';
import {TeamModel} from '../../../../shared/model/response-payload/collaborators/teams/team';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {AuthService} from '../../../../shared/services/back-end/auth/auth.service';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {NationalitiesService} from '../../../../shared/services/nationalities/nationalities';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dash-default',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../dash-main/dash-main.component.css', './profile.component.css']
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
  urlFace: string | ArrayBuffer = '';
  urlPile: string | ArrayBuffer = '';

  sickLeaveRules: any = { isdefault: '',
    name: '',
    leave: '',
    value: '',
    uuid: '',
    total: '',
    listleaveperday: ''
  };
  payedLeaveRules: any = { isdefault: '',
    name: '',
    leave: '',
    value: '',
    uuid: '',
    total: '',
    listleaveperday: ''
  };
  currentuuid: any;
  nationalities: any;
  currentRule: any;
  currentCollaborator: any;

  FileSelectFace: any;
  FileSelectPile: any;
  personalPicture: any;

  uuidformdata: any;
  private updateCollaboratorFinished = new BehaviorSubject(null);
  Personnelpicture: any;

   formData = new FormData();
   collaboratorResult: any;
  // collaboratorResult: CollaboratorModel = new CollaboratorModel(
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: 0, dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value:  moment().toDate(), dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: 0, dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: false, dirty: false, class: '', error: ''},
  //   {value: null, dirty: false, class: '', error: ''},
  //   new CollaboratorBankAccount(
  //     {value: '', dirty: false, class: '', error: ''},
  //     {value: '', dirty: false, class: '', error: ''},
  //   ),
  //   true,
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   new TeamModel(
  //     {value: '', dirty: false, class: '', error: ''},
  //     {value: '', dirty: false, class: '', error: ''},
  //     {value: '', dirty: false, class: '', error: ''},
  //     {
  //       uuid: {value: '', dirty: false, class: '', error: ''},
  //     }
  //   ),
  // );
  firstcollaboratorResulttostring = '';
  unamePattern = new RegExp('^[0-9]{10}$');
  comptePattern = new RegExp('^[0-9]{20}$');
  telPattern = new RegExp('^[0-9]{8}$');
  emailPattern = new RegExp( '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');


  constructor(private logger: NGXLogger,
              private sirhService: CollaboratorService,
              public router: Router,
              private leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private modalService: NgbModal,
              private authService: AuthService,
              private nationalitiesService: NationalitiesService
              ) {
  }



  ngOnInit(): void {

    this.nationalities = this.nationalitiesService.nationalities;
    if (this.authService.connectedUser != null ) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) { this.currentuuid = this.sirhService.uuid.access_id; }
    this.leaveService.getAllLeaveByCollaboratorbyUuid(this.currentuuid).subscribe(response => {
        if (response.sickLeave_rule != null && response.payed_rule != null) {
        const splittedsick = response.sickLeave_rule.value.split(',', 12);
        const sumsick = splittedsick.reduce((a, b) => a + Number(b), 0).toFixed(2);
        const splittedpayed = response.payed_rule.value.split(',', 12);
        const sumpayed = splittedpayed.reduce((a, b) => a + Number(b), 0).toFixed(2);
        this.sickLeaveRules = { isdefault: response.sickLeave_rule.is_default,
          name: response.sickLeave_rule.name,
          leave: response.sickLeave_rule.leave,
          value: response.sickLeave_rule.value,
          uuid: response.sickLeave_rule.uuid,
          total: sumsick,
          listleaveperday: splittedsick
        };
        this.payedLeaveRules =  { isdefault: response.payed_rule.is_default,
        name: response.payed_rule.name,
        leave: response.payed_rule.leave,
        value: response.payed_rule.value,
        uuid: response.payed_rule.uuid,
        total: sumpayed,
        listleaveperday: splittedpayed
      };
        }
    });
    this.sirhService.getCollaborator( this.currentuuid).subscribe(response => {
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
        created: { value: response.created, dirty: false, class: '', error: '' },
        collaboratorBankAccount:
          {
            uuid: {value:  response.collaboratorBankAccount.uuid, dirty: false, class: '', error: ''},
            accountnumber: {value:  response.collaboratorBankAccount.accountnumber, dirty: false, class: '', error: ''},
            bankname: {value:  response.collaboratorBankAccount.bankname, dirty: false, class: '', error: ''}
          },
        isValid: true,
        civilState: { value: response.civilState, dirty: false, class: '', error: '' },
        dateOfCin: { value: response.dateOfCin, dirty: false, class: '', error: '' },
        attachementCinBack: { value: response.attachementCinBack, dirty: false, class: '', error: '' },
        attachementCinFront: { value: response.attachementCinFront, dirty: false, class: '', error: '' },
        team: {
          uuid: {value: '', dirty: false, class: '', error: '' },
          description: {value: '', dirty: false, class: '', error: '' },
          label: {value: '', dirty: false, class: '', error: '' },
          managerteam: null
        },
        teamBoss: {value: response.teamBoss, dirty: false, class: '', error: '' },
      };
      const collaboratorToStringifiy = {
        address:  response.address,
        city: response.city,
        country: response.country,
        dateOfBirth: response.dateOfBirth,
        faxNumber: response.faxNumber,
        firstname: response.firstname,
        idCardNumber: response.idCardNumber,
        lastname: response.lastname,
        maidenName: response.maidenName,
        matricule: response.matricule,
        mobileNumber: response.mobileNumber,
        passportId: response.passportId,
        personalEmail: response.personalEmail,
        personalPicture:  response.personalPicture ,
        phoneNumber: response.phoneNumber,
        postalCode: response.postalCode,
        proEmail: response.proEmail,
        salutation: response.salutation,
        socialSecurityNumber: response.socialSecurityNumber,
        state: response.state,
        status: response.status,
        uuid: response.uuid,
        nationality: response.nationality,
        created: response.created,
        collaboratorBankAccount:
          { uuid: response.collaboratorBankAccount.uuid,
            accountnumber: response.collaboratorBankAccount.accountnumber,
            bankname: response.collaboratorBankAccount.bankname
          },
        id: response.id,
        civilState: response.civilState,
        dateOfCin: response.dateOfCin,
        attachementCinBack:  response.attachementCinBack,
        attachementCinFront: response.attachementCinFront,
        teamBoss: response.teamBoss
      };
      this.firstcollaboratorResulttostring = JSON.stringify(collaboratorToStringifiy);
      this.urlPile = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh/collaborators/loadFile/' + this.collaboratorResult.attachementCinBack.value;
      this.urlFace = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh/collaborators/loadFile/' + this.collaboratorResult.attachementCinFront.value;
      this.url = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh/collaborators/loadFile/' + this.collaboratorResult.personalPicture.value;
      this.ref.detectChanges();
      this.logger.trace('collaborator details');
    }
    );
    console.log(this.collaboratorResult);
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const file = event.target.files[0];
      this.personalPicture = file;
      this.Personnelpicture = event.target.files[0];

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          console.log(this.url);
      };
    }
  }

  onFileSelectPile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const file = event.target.files[0];
      this.FileSelectPile = event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlPile = event.target.result;
        console.log(this.urlPile);
      };
    }

    // if (event.target.files.length > 0) {
    //   this.FileSelectPile = event.target.files[0];
    //   this.urlPile = event.target.result;
    //   console.log(this.urlPile);
    // }
  }
  onFileSelectFace(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const file = event.target.files[0];
      this.FileSelectFace = event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlFace = event.target.result;
        console.log(this.urlFace);
      };

      // this.FileSelectFace = event.target.files[0];
      // this.urlFace = event.target.result;
      // console.log(this.urlFace);
    }
  }

  onFormSubmit() {

      this.update();


  }

  update() {
    this.updateCollaboratorFinished.next(false);

    if ( this.Personnelpicture !== undefined) {
      this.formData.append('avatar', this.Personnelpicture);
    }

    if ( this.FileSelectFace !== undefined) {
      this.formData.append('rectcin', this.FileSelectFace);
    }

    if ( this.FileSelectPile !== undefined) {
      this.formData.append('verscin', this.FileSelectPile);
    }

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
      personalPicture:  this.collaboratorResult.personalPicture.value ,
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
        { uuid: this.collaboratorResult.collaboratorBankAccount.uuid.value,
          accountnumber: this.collaboratorResult.collaboratorBankAccount.accountnumber.value,
          bankname: this.collaboratorResult.collaboratorBankAccount.bankname.value
        },
      id: this.collaboratorResult.id.value,
       civilState: this.collaboratorResult.civilState.value,
       dateOfCin: this.collaboratorResult.dateOfCin.value,
       attachementCinBack:  this.collaboratorResult.attachementCinBack.value,
       attachementCinFront: this.collaboratorResult.attachementCinFront.value,
      teamBoss: this.collaboratorResult.teamBoss.value
    };
    const b = JSON.stringify(currentCollaborator);
    if (this.firstcollaboratorResulttostring !== (JSON.stringify(currentCollaborator))) {
      this.sirhService.ModifyProfile(currentCollaborator).subscribe(() => {
        const shadesEl = document.querySelector('.alert-success');
        shadesEl.classList.add('show');
        setTimeout(() => {
          shadesEl.classList.remove('show');
        }, 3000);
        this.uuidformdata = this.collaboratorResult.uuid.value;
        this.updateCollaboratorFinished.next(true);
      });

      this.updateCollaboratorFinished.subscribe(value => {

        // send picture to back
        if (value === true) {
          this.sirhService.addpicture(this.formData, this.uuidformdata).subscribe(response => {
            console.log(response);
          });

        }
      });
    }
    // add class show alert
  }


  private validateRequiredInputForm() {
    if (this.collaboratorResult.salutation.value === '') {
      this.collaboratorResult.salutation.dirty = true;
      this.collaboratorResult.salutation.class = 'invalid';
      this.collaboratorResult.salutation.error = 'salutation should not be empty';
    } else {
      this.collaboratorResult.salutation.dirty = false;
      this.collaboratorResult.salutation.class = 'valid';
      this.collaboratorResult.salutation.error = '';
    }
    if (this.collaboratorResult.lastname.value === '') {
      this.collaboratorResult.lastname.dirty = true;
      this.collaboratorResult.lastname.class = 'invalid';
      this.collaboratorResult.lastname.error = 'lastname not be empty';
    } else {
      this.collaboratorResult.lastname.dirty = false;
      this.collaboratorResult.lastname.class = 'valid';
      this.collaboratorResult.lastname.error = '';
    }
    if (this.collaboratorResult.firstname.value === '') {
      this.collaboratorResult.firstname.dirty = true;
      this.collaboratorResult.firstname.class = 'invalid';
      this.collaboratorResult.firstname.error = 'firstname should not be empty';
    } else {
      this.collaboratorResult.firstname.dirty = false;
      this.collaboratorResult.firstname.class = 'valid';
      this.collaboratorResult.firstname.error = '';
    }
    if (this.collaboratorResult.country.value === '') {
      this.collaboratorResult.country.dirty = true;
      this.collaboratorResult.country.class = 'invalid';
      this.collaboratorResult.country.error = 'country should not be empty';
    } else {
      this.collaboratorResult.country.dirty = false;
      this.collaboratorResult.country.class = 'valid';
      this.collaboratorResult.country.error = '';
    }
    if (this.collaboratorResult.status.value === '') {
      this.collaboratorResult.status.dirty = true;
      this.collaboratorResult.status.class = 'invalid';
      this.collaboratorResult.status.error = 'status should not be empty';
    } else {
      this.collaboratorResult.status.dirty = false;
      this.collaboratorResult.status.class = 'valid';
      this.collaboratorResult.status.error = '';
    }
    if (this.collaboratorResult.collaboratorBankAccount.accountnumber.value === '') {
      this.collaboratorResult.collaboratorBankAccount.accountnumber.dirty = true;
      this.collaboratorResult.collaboratorBankAccount.accountnumber.class = 'invalid';
      this.collaboratorResult.collaboratorBankAccount.accountnumber.error = 'accountnumber should not be empty';
    } else {
      this.collaboratorResult.collaboratorBankAccount.accountnumber.dirty = false;
      this.collaboratorResult.collaboratorBankAccount.accountnumber.class = 'valid';
      this.collaboratorResult.collaboratorBankAccount.accountnumber.error = '';
    }
    if (this.collaboratorResult.collaboratorBankAccount.bankname.value === '') {
      this.collaboratorResult.collaboratorBankAccount.bankname.dirty = true;
      this.collaboratorResult.collaboratorBankAccount.bankname.class = 'invalid';
      this.collaboratorResult.collaboratorBankAccount.bankname.error = 'bankname should not be empty';
    } else {
      this.collaboratorResult.collaboratorBankAccount.bankname.dirty = false;
      this.collaboratorResult.collaboratorBankAccount.bankname.class = 'valid';
      this.collaboratorResult.collaboratorBankAccount.bankname.error = '';
    }
    if (this.collaboratorResult.address.value === '') {
      this.collaboratorResult.address.dirty = true;
      this.collaboratorResult.address.class = 'invalid';
      this.collaboratorResult.address.error = 'address should not be empty';
    } else {
      this.collaboratorResult.address.dirty = false;
      this.collaboratorResult.address.class = 'valid';
      this.collaboratorResult.address.error = '';
    }
    if (this.collaboratorResult.city.value === '') {
      this.collaboratorResult.city.dirty = true;
      this.collaboratorResult.city.class = 'invalid';
      this.collaboratorResult.city.error = 'city should not be empty';
    } else {
      this.collaboratorResult.city.dirty = false;
      this.collaboratorResult.city.class = 'valid';
      this.collaboratorResult.city.error = '';
    }
    if (this.collaboratorResult.socialSecurityNumber.value === 0) {
      this.collaboratorResult.socialSecurityNumber.dirty = true;
      this.collaboratorResult.socialSecurityNumber.class = 'invalid';
      this.collaboratorResult.socialSecurityNumber.error = 'social Security Number should not be empty';
    } else {
      this.collaboratorResult.socialSecurityNumber.dirty = false;
      this.collaboratorResult.socialSecurityNumber.class = 'valid';
      this.collaboratorResult.socialSecurityNumber.error = '';
    }
    if (this.collaboratorResult.idCardNumber.value === '') {
      this.collaboratorResult.idCardNumber.dirty = true;
      this.collaboratorResult.idCardNumber.class = 'invalid';
      this.collaboratorResult.idCardNumber.error = 'Card Number should not be empty';
    } else {
      this.collaboratorResult.idCardNumber.dirty = false;
      this.collaboratorResult.idCardNumber.class = 'valid';
      this.collaboratorResult.idCardNumber.error = '';
    }

  }


  private FormIsValid() {
    for (const element in this.collaboratorResult) {
      if (this.collaboratorResult[element].dirty) {
        this.collaboratorResult.isValid = false;
        break;
      } else {
        this.collaboratorResult.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.collaboratorResult.isValid;
  }

  onSelectAddNew(rule: any) {
    // const event = rule.target as HTMLInputElement;
    // if (event.value === 'new') {
    //   this.router.navigateByUrl('/dashboard/admin/conge/companyenabledrule');
    // } else {
    //   this.currentRule = this.congeRulesList.find(elt => elt.uuid === event.value);
    //   const shadesEl2 = document.querySelector('.delete');
    //   document.querySelector('.custom-width').classList.add('custom-width-show');
    //   shadesEl2.classList.add('show');
    // }
  }
  close(content) {
    this.modalService.dismissAll(content);
  }

  open(content: any) {
    this.modalService.open(content);
  }
  openRule(content: any) {
    this.modalService.open(content, {size: 'xl'});
  }
}
