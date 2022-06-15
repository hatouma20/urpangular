import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {LeaveType} from '../../../../shared/constants/leave-type';
import {Companyleaverule} from '../../../../shared/model/response-payload/collaborators/congé/companyleaverule';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {Leavedaysinmonths} from '../../../../shared/model/response-payload/collaborators/congé/leavedaysinmonths';
import {AuthService} from '../../../../shared/services/back-end/auth/auth.service';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-company-enabled-rule',
  templateUrl: './regleconge.component.html',
  styleUrls: ['./regleconge.component.css']
})
export class CompanyEnabledRuleComponent implements OnInit {
  editField: string;
  currentuuid = '';
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
              private ref: ChangeDetectorRef,
              private authService: AuthService,
              private sirhService: CollaboratorService) {
  }

  ngOnInit(): void {
    if (this.authService.connectedUser != null ) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) { this.currentuuid = this.sirhService.uuid.access_id; }
    this.leaveService.getLeaveByCollaborator(this.currentuuid).subscribe(response => {
      response.rules.forEach(elt => {
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
  open(content) {
    this.modalService.open(content);
  }
}
