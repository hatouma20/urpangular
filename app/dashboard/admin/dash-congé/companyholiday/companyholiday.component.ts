import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
import {LeaveType} from '../../../../shared/constants/leave-type';
import {CompanyHoliday} from '../../../../shared/model/response-payload/collaborators/congé/company-holiday';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-company-holiday',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './companyholiday.component.html',
  styleUrls: ['./companyholiday.component.css']
})

export class CompanyholidayComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  editField: string;
  currentHoliday: any;
  daysofMonth = [];
  form: WindForm = new WindForm([
    new WindFormElement('title', '', 'text', [Validators.required, Validators.min(4)], 'title'),
  ]);
  companyHoliday: CompanyHoliday = new CompanyHoliday(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: false, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  Holidays: Array<any> = [];
  // end add class show alert
  days = true;

  constructor(private modal: NgbModal,
              private leaveService: LeavesService,
              private modalService: NgbModal,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.leaveService.getAllcompanyHoliday().subscribe(response => {
      const list = response;
      list.forEach(elt => {
      this.Holidays.push(
        {
          day: elt.day,
          month: moment.months(elt.month - 1),
          payed: elt.payed,
          title: elt.title,
          total_days: elt.total_days,
          uuid: elt.uuid
        }
      );
      this.ref.detectChanges(); });
      });
  }

  onFormSubmit() {
      this.submitForm();
  }
  remove(currentHoliday: any) {
    const uuid = currentHoliday.uuid;
    this.leaveService.deletecompanyHoliday(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.Holidays[id][property] = editField;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  selectMonth($event: Event, value: string) {
    // @ts-ignore
    const nbdays = moment(Number(value) + 1, 'MM').daysInMonth();
    // @ts-ignore
    this.daysofMonth = Array(nbdays).fill().map((x, i) => i + 1);
    this.days = false;
  }

  private submitForm() {
    this.leaveService
      .createCompanyHoliday(  {
        day: Number(this.companyHoliday.day.value),
        month: Number(this.companyHoliday.month.value ) + 1,
        payed: this.companyHoliday.payed.value,
        title: this.companyHoliday.title.value,
        total_days: Number(this.companyHoliday.total_days.value),
        uuid: '',
      }, ).subscribe(response => {
    });
    // window.location.reload();
    // add class show alert
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
    // window.location.reload();
    this.Holidays.push(
      {
        day: Number(this.companyHoliday.day.value),
        month :  moment.months(Number(this.companyHoliday.month.value )),
        payed: this.companyHoliday.payed.value,
        title: this.companyHoliday.title.value,
        total_days: Number(this.companyHoliday.total_days.value),
      }
    );
  }
  open(content, holiday: any) {
    this.currentHoliday = holiday;
    this.currentHoliday.month = Number(moment().month(holiday.month).format('M')) ;
    const nbdays = moment(Number( this.currentHoliday.month) , 'MM').daysInMonth();
    // @ts-ignore
    this.daysofMonth = Array(nbdays).fill().map((x, i) => i + 1);
    this.modalService.open(content,  {size: 'xl'});
  }

  onModify(currentHoliday: any) {
    currentHoliday.month = currentHoliday.month;
    this.leaveService.updatecompanyHoliday(currentHoliday).subscribe(response =>
      console.log(response)
      // window.location.reload()
    );
    const shadesEl = document.querySelector('.alert-success-update');
    shadesEl.classList.add('show');
  }
  close(content) {
    this.currentHoliday.month = moment.months(this.currentHoliday.month - 1);
    this.modalService.dismissAll(content);
  }
}
