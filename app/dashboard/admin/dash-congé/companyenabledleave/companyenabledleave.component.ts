import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {LeaveType} from '../../../../shared/constants/leave-type';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wind-company-enabled-leave',
  templateUrl: './companyenabledleave.component.html',
  styleUrls: ['./companyenabledleave.component.css'],
  styles: [
    `

         `
  ]})
export class CompanyEnabledLeaveComponent implements OnInit {
  checked: boolean;
  editField: string;

  uuidd : any;
  form: WindForm = new WindForm([
    new WindFormElement('days_in_advance', '', 'number', [Validators.required, Validators.min(4)], 'days_in_advance'),
    new WindFormElement('deductible', '', 'checkbox', [], 'deductible'),
    new WindFormElement('full_day', '', 'checkbox', [], 'full_day'),
    new WindFormElement('negative_credit', '', 'checkbox', [], 'negative_credit'),
    new WindFormElement('partial_day', '', 'checkbox', [], 'partial_day'),
    new WindFormElement('simultaneously_limit', '', 'number', [Validators.required, Validators.min(4)], 'simultaneously_limit'),
    new WindFormElement('type', '', '', [], ''),
    new WindFormElement('custom_type', '', 'text', [Validators.required, Validators.min(4)], 'custom_type'),
    new WindFormElement('active', '', 'checkbox', [Validators.required, Validators.min(4)], 'active'),
  ]);
  companyEnabledLeave: Leave = new Leave(
    {value: false, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    true
  );
  companyEnabledLeaveadd: Leave = new Leave(
    {value: false, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    true
  );
  leaveType: Array<any>;
  isOtherLeave: Array<boolean> = [];
  companyEnabledLeaveList: Array<Leave> = [];
  private leaveSelected: any;

  constructor(private logger: NGXLogger,
              private leaveService: LeavesService,
              private router: Router,
              private ref: ChangeDetectorRef,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.leaveService.getAllcompanyEnabledLeaveList().subscribe(response => {
      response.forEach(elt => {
        this.companyEnabledLeaveList.push( {
          active : {value: elt.active, dirty: false, class: '', error: ''},
          days_in_advance : {value: elt.days_in_advance, dirty: false, class: '', error: ''},
          deductible : {value: elt.deductible, dirty: false, class: '', error: ''},
          full_day : {value: elt.full_day, dirty: false, class: '', error: ''},
          negative_credit : {value: elt.negative_credit, dirty: false, class: '', error: ''},
          partial_day : {value: elt.partial_day, dirty: false, class: '', error: ''},
          simultaneously_limit : {value: elt.simultaneously_limit, dirty: false, class: '', error: ''},
          type : {value: elt.type, dirty: false, class: '', error: ''},
          custom_type : {value: elt.custom_type, dirty: false, class: '', error: ''},
          uuid : {value: elt.uuid, dirty: false, class: '', error: ''},
          max_days : {value: elt.max_days, dirty: false, class: '', error: ''},
          isValid : true,
        });
        if (elt.type === LeaveType.OTHER_LEAVE) {
            this.isOtherLeave.push( true );
          } else {  this.isOtherLeave.push( false ); }
        });
    }
    );
    this.leaveType = [LeaveType.HOURLY_LEAVE, LeaveType.SICK_LEAVE, LeaveType.PAYED_LEAVE, LeaveType.OTHER_LEAVE];
}

  contenteditable(id: number, proprety: string) {
    document.getElementById(proprety + id).contentEditable = String(true);
    document.getElementById(proprety + id).classList.add('focus');
  }

  remove(uuid: any, id: any) {
    this.leaveService.deletecompanyEnabledLeaveList(uuid).subscribe(response =>
    this.companyEnabledLeaveList.splice(id, 1)
  );
    this.modalService.dismissAll();
  }

  updateList(id: number, property: string, event: any) {
    this.leaveSelected = {
      active : this.companyEnabledLeaveList[id].active.value ,
      days_in_advance : this.companyEnabledLeaveList[id].days_in_advance.value,
      deductible : this.companyEnabledLeaveList[id].deductible.value,
      full_day : this.companyEnabledLeaveList[id].full_day.value,
      negative_credit : this.companyEnabledLeaveList[id].negative_credit.value,
      partial_day : this.companyEnabledLeaveList[id].partial_day.value,
      simultaneously_limit : this.companyEnabledLeaveList[id].simultaneously_limit.value,
      type : this.companyEnabledLeaveList[id].type.value,
      custom_type : this.companyEnabledLeaveList[id].custom_type.value,
      max_days : this.companyEnabledLeaveList[id].max_days.value,
      uuid : this.companyEnabledLeaveList[id].uuid.value,
    }
    if (property === 'deductible' || property === 'full_day' || property === 'active' || property === 'partial_day' || property === 'negative_credit') {
      this.checked = this.leaveSelected[property];
      this.checked = !this.checked;
      this.leaveSelected[property] = this.checked;
    } else {
      const editField = event.target.textContent;
      this.leaveSelected[property] = editField;
    }
    this.leaveService.updatecompanyEnabledLeaveList(this.leaveSelected).subscribe(response =>
      this.companyEnabledLeaveList[id][property].value = response[property]
    );
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  onFormSubmit() {
    // this.validateRequiredInputForm();
    // if (!this.FormIsValid()) {
    //   const shadesEl2 = document.querySelector('.alert-danger');
    //   shadesEl2.classList.add('show');
    //   return;
    // } else {
      this.submitForm();
    // }
  }

  ondeductibleSelect(property: string) {
    this.companyEnabledLeave[property].value = !this.companyEnabledLeave[property].value;
  }

  onSelectType(type: any) {
    if (type === LeaveType.OTHER_LEAVE) {
      const shadesEl = document.querySelector('.custom-type');
      shadesEl.classList.add('show');
    }
  }
  open(content) {
    this.modalService.open(content, {size: 'm'});
  }
  private submitForm() {

    this.leaveService.createCompanyEnabledLeaves({
        active: this.companyEnabledLeaveadd.active.value,
        custom_type: this.companyEnabledLeaveadd.custom_type.value,
        days_in_advance: this.companyEnabledLeaveadd.days_in_advance.value,
        deductible: this.companyEnabledLeaveadd.deductible.value,
        full_day: this.companyEnabledLeaveadd.full_day.value,
        negative_credit: this.companyEnabledLeaveadd.negative_credit.value,
        partial_day: this.companyEnabledLeaveadd.partial_day.value,
        simultaneously_limit: this.companyEnabledLeaveadd.simultaneously_limit.value ,
        max_days : this.companyEnabledLeaveadd.max_days.value,
        type: LeaveType.OTHER_LEAVE,
        uuid: '',
      }).subscribe(response => {

      this.companyEnabledLeaveList.push(
        {
          active: { value: this.companyEnabledLeaveadd.active.value, dirty: false, class: '', error: ''},
          days_in_advance: {value: Number(this.companyEnabledLeaveadd.days_in_advance.value), dirty: false, class: '', error: ''},
          deductible: {value: this.companyEnabledLeaveadd.deductible.value, dirty: false, class: '', error: ''},
          full_day: {value: this.companyEnabledLeaveadd.full_day.value, dirty: false, class: '', error: ''},
          negative_credit: {value: this.companyEnabledLeaveadd.negative_credit.value, dirty: false, class: '', error: ''},
          partial_day: {value: this.companyEnabledLeaveadd.partial_day.value, dirty: false, class: '', error: ''},
          simultaneously_limit: {value: Number(this.companyEnabledLeaveadd.simultaneously_limit.value), dirty: false, class: '', error: ''},
          type: {value: LeaveType.OTHER_LEAVE, dirty: false, class: '', error: ''},
          custom_type: {value: this.companyEnabledLeaveadd.custom_type.value, dirty: false, class: '', error: ''},
          max_days: {value: this.companyEnabledLeaveadd.max_days.value, dirty: false, class: '', error: ''},
          isValid: true,
          uuid: response.uuid,
        });
    });
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
    this.isOtherLeave.push( true );
  }
}

