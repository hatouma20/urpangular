import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {BehaviorSubject, Subject} from 'rxjs';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {LeaveRequest} from '../../../../shared/model/response-payload/collaborators/congé/leave-request';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
@Component({
  selector: 'wind-request-leave',
  templateUrl: './requestleave.component.html',
  styleUrls: ['requestleave.component.css'],
  styles: [
    `
      ::ng-deep   .btn-light {
        color: #3f3f3f !important;
      }
      ::ng-deep .ngb-dp-weekday {
        color: #7e869d !important;
      }
  `
  ]
})

export class RequestLeaveComponent implements OnInit {
  private getAllLeaveByCollaboratorFinished = new BehaviorSubject(null);
  private getAllLeaveFinished = new BehaviorSubject(null);
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  period = { fd: '', td: '', type: ''};
  leave: Leave = new Leave(
    {value: false, dirty: false, class: '', error: ''},
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
  requestLeave: LeaveRequest = new LeaveRequest(
    {value: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: moment().toDate(), dirty: false, class: '', error: ''},
    {value: moment().toDate(), dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
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
    {value: moment().toDate(), dirty: false, class: '', error: ''},
    {values: {pending: true, approved: false, denied: false}, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  requestSelected: any;
  editField: string;
  requestLeaveList: Array<any> = [];
  companyEnabledLeaveList: Array<Leave> = [];
  constructor(private modalService: NgbModal,
              private leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false
    };
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
        this.companyEnabledLeaveList.push({
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
    this.getAllLeaveFinished.next(false);
    this.leaveService.getAllLeaveRequest('', '').subscribe(response => {
      const list = response;
      list.forEach((elt , index) => {
        this.requestLeaveList.push(
          {
            collaborator: {value: elt.collaborator, dirty: false, class: '', error: ''},
            collaboratorname: {value: '', dirty: false, class: '', error: ''},
            collaboratorlastname: {value: '', dirty: false, class: '', error: ''},
            company: {value: elt.company, dirty: false, class: '', error: ''},
            deteminatedat: {value: elt.determined_at, dirty: false, class: '', error: ''},
            enddate: {value: elt.end_date, dirty: false, class: '', error: ''},
            hours: {value: elt.hours, dirty: false, class: '', error: ''},
            manager: {value: elt.manger_1, dirty: false, class: '', error: ''},
            leave : { active: elt.leave.active,
              days_in_advance: elt.leave.days_in_advance,
              deductible: elt.leave.deductible,
              full_day: elt.leave.full_day,
              negative_credit: elt.leave.negative_credit,
              partial_day: elt.leave.partial_day,
              simultaneously_limit: elt.leave.simultaneously_limit,
              type: elt.leave.type,
              custom_type: elt.leave.custom_type,
              uuid:  elt.leave.uuid,
              max_days:  elt.leave.max_days,
              isValid: true
            },
            reason: {value: elt.reason, dirty: false, class: '', error: ''},
            startdate: {value: elt.start_date, dirty: false, class: '', error: ''},
            status: {values: {pending: false, approved: false, denied: true, partially_approved: false}, dirty: false, class: '', error: ''},
            uuid: {value: elt.uuid, dirty: false, class: '', error: ''},
          }
        );
        if (elt.status === 'PENDING') {
          this.requestLeaveList[index].status.values.pending = true;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.approved = false;
          this.requestLeaveList[index].status.values.partially_approved = false;
        }
        if (elt.status === 'DENIED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = true;
          this.requestLeaveList[index].status.values.approved = false;
          this.requestLeaveList[index].status.values.partially_approved = false;
        }
        if (elt.status === 'APPROVED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.partially_approved = false;
          this.requestLeaveList[index].status.values.approved = true;
        }
        if (elt.status === 'PARTIALLY_APPROVED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.partially_approved = true;
          this.requestLeaveList[index].status.values.approved = false;
        }
        });
      this.dtTrigger.next();
      this.getAllLeaveFinished.next(true);
    });
    this.getAllLeaveFinished.subscribe(value => {
      if (value) {
        let i = 0;
        this.requestLeaveList.forEach((elt, index) => {
          this.sirhService.getCollaborator(elt.collaborator.value).subscribe(response => {
            this.requestLeaveList.find(request => request.collaborator.value === response.uuid);
            this.requestLeaveList[index].collaboratorname.value = response.firstname;
            this.requestLeaveList[index].collaboratorlastname.value = response.lastname;
            i++;
          });
        });
      }
    });
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.requestLeaveList[id][property].value = editField;
  }

  remove(id: any) {
    const requestSelected = this.requestLeaveList[id];
    this.leaveService.deletecompanyLeaveRequest(requestSelected.uuid.value).subscribe(response =>
      window.location.reload()
    );
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }


  open(content) {
    this.modalService.open(content,  {size: 'm'});
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  changestatus(contentstatus) {
    this.modalService.open(contentstatus);
  }

  closestatus(contentstatus, id) {
    this.modalService.dismissAll(contentstatus);
  }

  onApprovedSelect(event: Event, id: number) {
    const checkevent = event.target as HTMLInputElement;
    if (checkevent.checked === true) {
      this.requestLeaveList[id].status.values.pending = false;
      this.requestLeaveList[id].status.values.approved = true;
      this.requestLeaveList[id].status.values.denied = false;
      this.requestLeaveList[id].status.values.partially_approved = false;
      this.requestSelected = {
        collaborator: this.requestLeaveList[id].collaborator.value,
          company: this.requestLeaveList[id].company.value,
        determined_at: new Date(),
        end_date:  this.requestLeaveList[id].enddate.value,
        manager_1: this.requestLeaveList[id].manager_1.value,
        manager_2: this.requestLeaveList[id].manager_2.value,
        hours: this.requestLeaveList[id].hours.value,
        leave: {active: this.requestLeaveList[id].leave.active,
        days_in_advance: this.requestLeaveList[id].leave.days_in_advance,
        deductible: this.requestLeaveList[id].leave.deductible ,
        full_day: this.requestLeaveList[id].leave.full_day,
        negative_credit: this.requestLeaveList[id].leave.negative_credit,
        partial_day: this.requestLeaveList[id].leave.partial_day,
        simultaneously_limit: this.requestLeaveList[id].leave.simultaneously_limit,
        type: this.requestLeaveList[id].leave.type,
        custom_type: this.requestLeaveList[id].leave.custom_type,
        uuid : this.requestLeaveList[id].leave.uuid},
        reason: this.requestLeaveList[id].reason.value,
        start_date: this.requestLeaveList[id].startdate.value,
        status: 'APPROVED',
        uuid:  this.requestLeaveList[id].uuid.value
      };
      this.leaveService.decidecompanyLeaveRequest(
        {decision : this.requestSelected.status,
          uuid: this.requestSelected.uuid}).subscribe(response =>
        // window.location.reload()
        this.requestLeaveList[id].status = response[status]
      );
    }
  }

  onDeniedSelect(event: Event, id: number) {
    const checkevent = event.target as HTMLInputElement;
    if (checkevent.checked === true) {
      this.requestLeaveList[id].status.values.pending = false;
      this.requestLeaveList[id].status.values.approved = false;
      this.requestLeaveList[id].status.values.partially_approved = false;
      this.requestLeaveList[id].status.values.denied = true;
      this.requestSelected = {
        collaborator: this.requestLeaveList[id].collaborator.value,
        company: this.requestLeaveList[id].company.value,
        determined_at: new Date(),
        end_date:  this.requestLeaveList[id].enddate.value,
        manager_1: this.requestLeaveList[id].manager_1.value,
        manager_2: this.requestLeaveList[id].manager_2.value,
        hours: this.requestLeaveList[id].hours.value,
        leave: {active: this.requestLeaveList[id].leave.active,
          days_in_advance: this.requestLeaveList[id].leave.days_in_advance,
          deductible: this.requestLeaveList[id].leave.deductible ,
          full_day: this.requestLeaveList[id].leave.full_day,
          negative_credit: this.requestLeaveList[id].leave.negative_credit,
          partial_day: this.requestLeaveList[id].leave.partial_day,
          simultaneously_limit: this.requestLeaveList[id].leave.simultaneously_limit,
          type: this.requestLeaveList[id].leave.type,
          custom_type: this.requestLeaveList[id].leave.custom_type,
          uuid : this.requestLeaveList[id].leave.uuid},
        reason: this.requestLeaveList[id].reason.value,
        start_date: this.requestLeaveList[id].startdate.value,
        status: 'DENIED',
        uuid:  this.requestLeaveList[id].uuid.value
      };
      this.leaveService.decidecompanyLeaveRequest(
        {decision : this.requestSelected.status,
          uuid: this.requestSelected.uuid}).subscribe(response =>
        // window.location.reload()
        this.requestLeaveList[id].status = response[status]
      );
    }
  }

  search() {
    const p = this.period;
    const fd = moment(this.period.fd).format('YYYY-MM-DD');
    const td = moment(this.period.td).format('YYYY-MM-DD');
    const type = this.period.type;
    this.getAllLeaveByCollaboratorFinished.next(false);
    this.leaveService.getAllLeaveRequestbyperiodandtype(fd, td, type ).subscribe(response => {
      const list = response;
      this.requestLeaveList = [];
      list.forEach((elt , index) => {

        this.requestLeaveList.push(
          {
            collaborator: {value: elt.collaborator, dirty: false, class: '', error: ''},
            collaboratorname: {value: '', dirty: false, class: '', error: ''},
            collaboratorlastname: {value: '', dirty: false, class: '', error: ''},
            company: {value: elt.company, dirty: false, class: '', error: ''},
            deteminatedat: {value: elt.determined_at, dirty: false, class: '', error: ''},
            enddate: {value: elt.end_date, dirty: false, class: '', error: ''},
            hours: {value: elt.hours, dirty: false, class: '', error: ''},
            manager_1: {value: elt.manager_1, dirty: false, class: '', error: ''},
            manager_2: {value: elt.manager_2, dirty: false, class: '', error: ''},
            leave : { active: elt.leave.active,
              days_in_advance: elt.leave.days_in_advance,
              deductible: elt.leave.deductible,
              full_day: elt.leave.full_day,
              negative_credit: elt.leave.negative_credit,
              partial_day: elt.leave.partial_day,
              simultaneously_limit: elt.leave.simultaneously_limit,
              type: elt.leave.type,
              custom_type: elt.leave.custom_type,
              uuid:  elt.leave.uuid,
              isValid: true
            },
            reason: {value: elt.reason, dirty: false, class: '', error: ''},
            startdate: {value: elt.start_date, dirty: false, class: '', error: ''},
            status: {values: {pending: false, approved: false, denied: true}, dirty: false, class: '', error: ''},
            uuid: {value: elt.uuid, dirty: false, class: '', error: ''},
          }
        );
        if (elt.status === 'PENDING') {
          this.requestLeaveList[index].status.values.pending = true;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.approved = false;
          this.requestLeaveList[index].status.values.partially_approved = false;
        }
        if (elt.status === 'DENIED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = true;
          this.requestLeaveList[index].status.values.approved = false;
          this.requestLeaveList[index].status.values.partially_approved = false;

        }
        if (elt.status === 'APPROVED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.approved = true;
          this.requestLeaveList[index].status.values.partially_approved = false;

        }
        if (elt.status === 'PARTIALLY_APPROVED') {
          this.requestLeaveList[index].status.values.pending = false;
          this.requestLeaveList[index].status.values.denied = false;
          this.requestLeaveList[index].status.values.approved = false;
          this.requestLeaveList[index].status.values.partially_approved = true;

        }
        });
      this.getAllLeaveByCollaboratorFinished.next(true);
    });
    this.getAllLeaveByCollaboratorFinished.subscribe(value => {
      if (value) {
        let i = 0;
        this.requestLeaveList.forEach((elt, index) => {
          this.sirhService.getCollaborator(elt.collaborator.value).subscribe(response => {
            this.requestLeaveList.find(request => request.collaborator.value === response.uuid);
            this.requestLeaveList[index].collaboratorname.value = response.firstname;
            this.requestLeaveList[index].collaboratorlastname.value = response.lastname;
            i++;
          });
        });
      }
    });
  }
}
