import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {Leave} from '../../../../shared/model/response-payload/collaborators/congé/leave';
import {LeaveRequest} from '../../../../shared/model/response-payload/collaborators/congé/leave-request';

@Component({
  selector: 'wind-conge',
  templateUrl: './congé.component.html',
  styleUrls: ['./congé.component.css']
})
export class CongeComponent implements OnInit {
  requestLeaveList: Array<any> = [];
  requestLeave: LeaveRequest = new LeaveRequest(
    {value: '', dirty: false, class: '', error: ''},
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

  constructor(private logger: NGXLogger, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
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

  private submitForm() {
    // tslint:disable-next-line:no-unused-expression max-line-length
    this.requestLeaveList.push({
      collaborator: {value: this.requestLeave.collaborator.value, dirty: false, class: '', error: ''},
      company: {value: this.requestLeave.company.value, dirty: false, class: '', error: ''},
      deteminatedat: {value: moment(this.requestLeave.determinedat.value).format('DD-MM-YYYY'), dirty: false, class: '', error: ''},
      enddate: {value: moment(this.requestLeave.enddate.value).format('DD-MM-YYYY'), dirty: false, class: '', error: ''},
      hours: {value: this.requestLeave.hours.value, dirty: false, class: '', error: ''},
      manager: {value: this.requestLeave.manager.value, dirty: false, class: '', error: ''},
      partialDayLeave: {value: 'this.requestLeave.partialDayLeave.value', dirty: false, class: '', error: ''},
      reason: {value: this.requestLeave.reason.value, dirty: false, class: '', error: ''},
      startdate: {value: moment(this.requestLeave.startdate.value).format('DD-MM-YYYY'), dirty: false, class: '', error: ''},
      status: {values: {pending: true, approved: false, denied: false}, dirty: false, class: '', error: ''},
    });
    // tslint:disable-next-line:no-unused-expression
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
  }

  private FormIsValid() {
    for (const element in this.requestLeave) {
      if (this.requestLeave[element].dirty) {
        this.requestLeave.isValid = false;
        break;
      } else {
        this.requestLeave.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.requestLeave.isValid;
  }

  private validateRequiredInputForm() {
    // tslint:disable-next-line:max-line-length
    if (this.requestLeave.collaborator.value === '') {
      this.requestLeave.collaborator.dirty = true;
      this.requestLeave.collaborator.class = 'invalid';
      this.requestLeave.collaborator.error = 'Collaborator should not be empty';
    } else {
      this.requestLeave.collaborator.dirty = false;
      this.requestLeave.collaborator.class = 'valid';
      this.requestLeave.collaborator.error = '';
    }
    if (this.requestLeave.reason.value === '') {
      this.requestLeave.reason.dirty = true;
      this.requestLeave.reason.class = 'invalid';
      this.requestLeave.reason.error = 'Reason should not be empty';
    } else {
      this.requestLeave.reason.dirty = false;
      this.requestLeave.reason.class = 'valid';
      this.requestLeave.reason.error = '';
    }
  }
}
