import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {LeaveRequest} from '../../../../shared/model/response-payload/collaborators/congé/leave-request';
import {AuthService} from '../../../../shared/services/back-end/auth/auth.service';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();  collaboratorHistory: any;
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
  editField: string;
  requestLeaveList: Array<any> = [];
  companyEnabledLeaveList: Array<Leave> = [];
  currentuuid: any;
  constructor(private modalService: NgbModal,
              private leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService,
              private authService: AuthService,
              ) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    if (this.authService.connectedUser != null) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) {
      this.currentuuid = this.sirhService.uuid.access_id;
    }
    this.leaveService.getAllLeaveByCollaboratorbyUuid(this.currentuuid).subscribe(response => {
        this.collaboratorHistory = {
          collaborator: response.collaborator,
          collaboratorname: '',
          current_payed_leave_credit: response.current_payed_leave_credit,
          current_sick_leave_credit: response.current_sick_leave_credit,
          rules: response.rules,
        };
      }
    );
    this.leaveService.getAllLeaveRequestByCollaborator(this.currentuuid).subscribe(response => {
      const list = response;
      this.requestLeaveList = [];
      list.forEach((elt, index) => {

        this.requestLeaveList.push(
          {
            collaborator: {value: elt.collaborator, dirty: false, class: '', error: ''},
            company: {value: elt.company, dirty: false, class: '', error: ''},
            deteminatedat: {value: elt.determined_at, dirty: false, class: '', error: ''},
            enddate: {value: elt.end_date, dirty: false, class: '', error: ''},
            hours: {value: elt.hours, dirty: false, class: '', error: ''},
            manager_1: {value: elt.manager_1, dirty: false, class: '', error: ''},
            manager_2: {value: elt.manager_2, dirty: false, class: '', error: ''},
            leave: {
              active: elt.leave.active,
              days_in_advance: elt.leave.days_in_advance,
              deductible: elt.leave.deductible,
              full_day: elt.leave.full_day,
              negative_credit: elt.leave.negative_credit,
              partial_day: elt.leave.partial_day,
              simultaneously_limit: elt.leave.simultaneously_limit,
              type: elt.leave.type,
              custom_type: elt.leave.custom_type,
              uuid: elt.leave.uuid,
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
        this.ref.detectChanges();
      });
      this.dtTrigger.next();
    });
    this.leaveService.getAllcompanyEnabledLeaveByType('SICK_LEAVE').subscribe(response => {
        this.companyEnabledLeaveList.push({
          active: {value: response.active, dirty: false, class: '', error: ''},
          days_in_advance: {value: response.days_in_advance, dirty: false, class: '', error: ''},
          deductible: {value: response.deductible, dirty: false, class: '', error: ''},
          full_day: {value: response.full_day, dirty: false, class: '', error: ''},
          negative_credit: {value: response.negative_credit, dirty: false, class: '', error: ''},
          partial_day: {value: response.partial_day, dirty: false, class: '', error: ''},
          simultaneously_limit: {value: response.simultaneously_limit, dirty: false, class: '', error: ''},
          type: {value: response.type, dirty: false, class: '', error: ''},
          custom_type: {value: response.custom_type, dirty: false, class: '', error: ''},
          uuid: {value: response.uuid, dirty: false, class: '', error: ''},
          max_days: {value: response.max_days, dirty: false, class: '', error: ''},
          isValid: true
        });
      }
    );
    this.leaveService.getAllcompanyEnabledLeaveByType('PAYED_LEAVE').subscribe(response => {
        this.companyEnabledLeaveList.push({
          active: {value: response.active, dirty: false, class: '', error: ''},
          days_in_advance: {value: response.days_in_advance, dirty: false, class: '', error: ''},
          deductible: {value: response.deductible, dirty: false, class: '', error: ''},
          full_day: {value: response.full_day, dirty: false, class: '', error: ''},
          negative_credit: {value: response.negative_credit, dirty: false, class: '', error: ''},
          partial_day: {value: response.partial_day, dirty: false, class: '', error: ''},
          simultaneously_limit: {value: response.simultaneously_limit, dirty: false, class: '', error: ''},
          type: {value: response.type, dirty: false, class: '', error: ''},
          custom_type: {value: response.custom_type, dirty: false, class: '', error: ''},
          uuid: {value: response.uuid, dirty: false, class: '', error: ''},
          max_days: {value: response.max_days, dirty: false, class: '', error: ''},
          isValid: true
        });
      }
    );
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

  onFormSubmit() {
      this.submitForm();
  }

  open(content) {
    this.modalService.open(content, {size: 'xl'} );
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  private submitForm() {
    const selectedleave = this.companyEnabledLeaveList.find(elt =>
      elt.uuid.value === this.leave.uuid.value);
    this.leaveService
  .createLeaveRequest(  {
    collaborator: this.currentuuid,
    company: null,
    determined_at: new Date(),
    end_date: moment(this.requestLeave.enddate.value),
    manager_1: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1',
    manager_2: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1',
    hours: 21,
    leave: {active: selectedleave.active.value,
      days_in_advance: selectedleave.days_in_advance.value,
      deductible: selectedleave.deductible.value ,
      full_day: selectedleave.full_day.value,
      negative_credit: selectedleave.negative_credit.value,
      partial_day: selectedleave.partial_day.value,
      simultaneously_limit: selectedleave.simultaneously_limit.value,
      type: selectedleave.type.value,
      custom_type: selectedleave.custom_type.value,
      uuid : selectedleave.uuid.value},
    reason: this.requestLeave.reason.value,
    start_date: moment(this.requestLeave.startdate.value),
    status: 'PENDING',
    uuid: ''
    }, ).subscribe(response => {
      if ( response === 403) {
        console.log('bad');
        const shadesEl = document.querySelector('.alert-danger');
        shadesEl.classList.add('show');
      } else  {
        // tslint:disable-next-line:no-unused-expression
        this.requestLeaveList.push( {
          collaborator: {value: this.currentuuid, dirty: false, class: '', error: ''},
          company: {value: '', dirty: false, class: '', error: ''},
          deteminatedat: {value: new Date(), dirty: false, class: '', error: ''},
          enddate: {value: moment(this.requestLeave.enddate.value).format('YYYY-MM-DD'), dirty: false, class: '', error: ''},
          hours: {value: 21, dirty: false, class: '', error: ''},
          manager_1: {value: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1', dirty: false, class: '', error: ''},
          manager_2: {value: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1', dirty: false, class: '', error: ''},
          leave: {active: selectedleave.active.value,
            days_in_advance: selectedleave.days_in_advance.value,
            deductible: selectedleave.deductible.value ,
            full_day: selectedleave.full_day.value,
            negative_credit: selectedleave.negative_credit.value,
            partial_day: selectedleave.partial_day.value,
            simultaneously_limit: selectedleave.simultaneously_limit.value,
            type: selectedleave.type.value,
            custom_type: selectedleave.custom_type.value,
            uuid : selectedleave.uuid.value},
          reason: {value: this.requestLeave.reason.value, dirty: false, class: '', error: ''},
          startdate: {value: moment(this.requestLeave.startdate.value).format('YYYY-MM-DD'), dirty: false, class: '', error: ''},
          status: {values: {pending: true, approved: false, denied: false, partially_approved: false}, dirty: false, class: '', error: ''},
          uuid: {value: '', dirty: false, class: '', error: ''},
        });
        const shadesEl = document.querySelector('.alert-success');
        shadesEl.classList.add('show');
        const a = (document.getElementById('form1') as HTMLFormElement)
        a.reset();
        setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
      }
    });
  }
}
