import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {LeaveType} from '../../../../shared/constants/leave-type';
import {Companyleaverule} from '../../../../shared/model/response-payload/collaborators/congé/companyleaverule';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {Leavedaysinmonths} from '../../../../shared/model/response-payload/collaborators/congé/leavedaysinmonths';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-company-enabled-rule',
  templateUrl: './regleconge.component.html',
  styleUrls: ['./regleconge.component.css']
})
export class CompanyEnabledRuleComponent implements OnInit {
  @Input('rule') rule: any;
  editField: string;
  ruleSelected: any;
  totalLaeveDays: number;
  months = [...Array(12).keys()];
  leaveDaysInMonths: Leavedaysinmonths = new Leavedaysinmonths(
    {value: '', dirty: false, class: '', error: ''},
    {value: [], dirty: false, class: '', error: ''},
    true
  );
  leave: Leave = new Leave(
    {value: null, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    true);
  companyEnabledRule: Companyleaverule = new Companyleaverule(
    {value: false, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value:
        new Leave({value: false, dirty: false, class: '', error: ''},
          {value: 0, dirty: false, class: '', error: ''},
          {value: false, dirty: false, class: '', error: ''},
          {value: false, dirty: false, class: '', error: ''},
          {value: false, dirty: false, class: '', error: ''},
          {value: false, dirty: false, class: '', error: ''},
          {value: 0, dirty: false, class: '', error: ''},
          {value: '', dirty: false, class: '', error: ''},
          {value: '', dirty: false, class: '', error: ''},
          {value: '', dirty: false, class: '', error: ''},
          {value: null, dirty: false, class: '', error: ''},
          true),
     dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  congeRulesList: Array<any> = [];
  companyEnabledLeaveList: Array<Leave> = [];
  constructor(private logger: NGXLogger,
              private modalService: NgbModal,
              private  leaveService: LeavesService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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
    this.leaveService.getAllcompanyEnabledLeaveByType('SICK_LEAVE').subscribe(response => {
          this.companyEnabledLeaveList.push( {
            active : {value: response.active, dirty: false, class: '', error: ''},
            days_in_advance : {value: response.days_in_advance, dirty: false, class: '', error: ''},
            deductible : {value: response.deductible, dirty: false, class: '', error: ''},
            full_day : {value: response.full_day, dirty: false, class: '', error: ''},
            negative_credit : {value: response.negative_credit, dirty: false, class: '', error: ''},
            partial_day : {value: response.partial_day, dirty: false, class: '', error: ''},
            simultaneously_limit : {value: response.simultaneously_limit, dirty: false, class: '', error: ''},
            type : {value: response.type, dirty: false, class: '', error: ''},
            custom_type : {value: response.custom_type, dirty: false, class: '', error: ''},
            uuid : {value: response.uuid, dirty: false, class: '', error: ''},
            max_days : {value: response.max_days, dirty: false, class: '', error: ''},
            isValid : true
        });
      }
    );
    this.leaveService.getAllcompanyEnabledLeaveByType('PAYED_LEAVE').subscribe(response => {
          this.companyEnabledLeaveList.push( {
            active : {value: response.active, dirty: false, class: '', error: ''},
            days_in_advance : {value: response.days_in_advance, dirty: false, class: '', error: ''},
            deductible : {value: response.deductible, dirty: false, class: '', error: ''},
            full_day : {value: response.full_day, dirty: false, class: '', error: ''},
            negative_credit : {value: response.negative_credit, dirty: false, class: '', error: ''},
            partial_day : {value: response.partial_day, dirty: false, class: '', error: ''},
            simultaneously_limit : {value: response.simultaneously_limit, dirty: false, class: '', error: ''},
            type : {value: response.type, dirty: false, class: '', error: ''},
            custom_type : {value: response.custom_type, dirty: false, class: '', error: ''},
            uuid : {value: response.uuid, dirty: false, class: '', error: ''},
            max_days : {value: response.max_days, dirty: false, class: '', error: ''},
            isValid : true
        });
      }
    );
  }

  contenteditable(id: number, proprety: string) {
    document.getElementById(proprety + id).contentEditable = String(true);
    document.getElementById(proprety + id).classList.add('focus');
  }

  remove(id: any) {
    const ruleSelected = this.congeRulesList[id];
    this.leaveService.deletecompanyLeaveRule(ruleSelected.uuid).subscribe(response =>
      window.location.reload()
    );
  }

  updateList(id: number, property: string, event: any) {
    this.ruleSelected = {
      isdefault : this.congeRulesList[id].isdefault ,
      name : this.congeRulesList[id].name,
      leave : { active: this.congeRulesList[id].leave.active,
        days_in_advance: this.congeRulesList[id].leave.days_in_advance,
        deductible: this.congeRulesList[id].leave.deductible,
        full_day: this.congeRulesList[id].leave.full_day,
        negative_credit: this.congeRulesList[id].leave.negative_credit,
        partial_day: this.congeRulesList[id].leave.partial_day,
        simultaneously_limit: this.congeRulesList[id].leave.simultaneously_limit,
        type: this.congeRulesList[id].leave.type,
        custom_type: this.congeRulesList[id].leave.custom_type,
        uuid:  this.congeRulesList[id].leave.uuid,
          isValid: true
      },
      uuid : this.congeRulesList[id].uuid,
      value : this.congeRulesList[id].value,
    };
    const editField = event.target.textContent;
    this.ruleSelected[property] = editField;
    this.leaveService.updatecompanyLeaveRule(this.ruleSelected).subscribe(response =>
      // window.location.reload()
      this.congeRulesList[id][property] = response[property]
    );
    document.getElementById(property + id).contentEditable = String(false);
    document.getElementById(property + id).classList.remove('focus');
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

  open(content, id) {
    const splitted = this.congeRulesList[id].value.split(',', 12);
    this.congeRulesList[id].listleaveperday = splitted;
    this.modalService.open(content,  {size: 'xl'});
  }

  updateListConge(i: number, id: number, property: string, event: any) {
    const editField = event.target.textContent;
    const splitted = this.congeRulesList[id].value.split(',', 12);
    splitted[i] = editField;
    this.ruleSelected = {
      isdefault : this.congeRulesList[id].isdefault ,
      name : this.congeRulesList[id].name,
      leave : { active: this.congeRulesList[id].leave.active,
        days_in_advance: this.congeRulesList[id].leave.days_in_advance,
        deductible: this.congeRulesList[id].leave.deductible,
        full_day: this.congeRulesList[id].leave.full_day,
        negative_credit: this.congeRulesList[id].leave.negative_credit,
        partial_day: this.congeRulesList[id].leave.partial_day,
        simultaneously_limit: this.congeRulesList[id].leave.simultaneously_limit,
        type: this.congeRulesList[id].leave.type,
        custom_type: this.congeRulesList[id].leave.custom_type,
        uuid:  this.congeRulesList[id].leave.uuid,
        isValid: true
      },
      uuid : this.congeRulesList[id].uuid,
      value : this.congeRulesList[id].value,
    };
    // @ts-ignore
    this.ruleSelected.value = ''.concat(splitted, ',');
    const sum = splitted.reduce((a, b) => a + Number(b), 0).toFixed(2);
    this.leaveService.updatecompanyLeaveRule(this.ruleSelected).subscribe(response => {
        // window.location.reload()
        this.congeRulesList[id][property] = response[property];
        this.congeRulesList[id].total = sum;
        // this.congeRulesList[id].listleaveperday = splitted;
      }
    );
  }

  changeValueConge(i: number, id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  private submitForm() {
    // @ts-ignore
    this.companyEnabledRule.value.value = ''.concat(this.leaveDaysInMonths.days.value, ',');
    this.leaveService
      .createLeaveRule(  {
        is_default: true,
        name: this.companyEnabledRule.name.value,
        leave: {active: false,
          days_in_advance: null,
          deductible: null ,
          full_day: null,
          negative_credit: null,
          partial_day: null,
          simultaneously_limit: null,
          type: null,
          custom_type: null,
          uuid : this.leave.uuid.value},
        value: this.companyEnabledRule.value.value,
        uuid: '',
      }, ).subscribe(response => {
    });
    const shadesEl = document.querySelector('.alert-regle');
    shadesEl.classList.add('show');
    document.querySelector('.alert-regle2').classList.add('show');
  }

  private FormIsValid() {
    if (this.leaveDaysInMonths.days.dirty) {
      this.leaveDaysInMonths.isValid = false;
    } else {
      this.leaveDaysInMonths.isValid = true;
    }
    if (this.companyEnabledRule.name.dirty) {
      this.companyEnabledRule.isValid = false;
    } else {
      this.companyEnabledRule.isValid = true;
    }
    if (this.companyEnabledRule.isValid === true || this.leaveDaysInMonths.isValid === true) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.remove('show');
    }
    // tslint:disable-next-line:no-unused-expression
    return (this.companyEnabledRule.isValid, this.leaveDaysInMonths.isValid);
  }

  private validateRequiredInputForm() {
    if (this.companyEnabledRule.name.value === '') {
      this.companyEnabledRule.name.dirty = true;
      this.companyEnabledRule.name.class = 'invalid';
      this.companyEnabledRule.name.error = 'Title should not be empty';
    } else {
      this.companyEnabledRule.name.dirty = false;
      this.companyEnabledRule.name.class = 'valid';
      this.companyEnabledRule.name.error = '';
    }

    if (this.leaveDaysInMonths.days.value.length < 12) {
      this.leaveDaysInMonths.days.dirty = true;
      this.leaveDaysInMonths.days.class = 'invalid';
      this.leaveDaysInMonths.days.error = 'Days should not be empty';
    } else {
      this.leaveDaysInMonths.days.dirty = false;
      this.leaveDaysInMonths.days.class = 'valid';
      this.leaveDaysInMonths.days.error = '';
    }
  }
  onChangeLeaveForMonth(i: number) {
  this.totalLaeveDays = this.leaveDaysInMonths.days.value.reduce((a, b) => a + Number(b), 0);
}
  onChangeTotaldays() {
    console.log(this.totalLaeveDays);
    const moy = (Number(this.totalLaeveDays) / 12).toFixed(1);
    const december = ( Number(this.totalLaeveDays) - Number(moy) * 11).toFixed(1) ;
    this.leaveDaysInMonths.days.value = [moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), moy.toString(), december.toString()];
  }
}
