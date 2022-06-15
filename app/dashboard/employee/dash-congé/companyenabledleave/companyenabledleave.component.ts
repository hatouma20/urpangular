import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {LeaveType} from '../../../../shared/constants/leave-type';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-company-enabled-leave',
  templateUrl: './companyenabledleave.component.html',
  styleUrls: ['./companyenabledleave.component.css']
})
export class CompanyEnabledLeaveComponent implements OnInit {
  checked: boolean;
  editField: string;
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
  leaveType: Array<any>;
  isOtherLeave: Array<boolean> = [];
  companyEnabledLeaveList: Array<Leave> = [];
  private leaveSelected: any;

  constructor(private logger: NGXLogger,
              private leaveService: LeavesService,
              private router: Router,
              private ref: ChangeDetectorRef) {
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



}
