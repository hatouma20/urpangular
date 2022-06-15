import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {CompanyHoliday} from '../../../../shared/model/response-payload/collaborators/congé/company-holiday';
import {WindForm, WindFormElement} from '../../../../shared/model/windForm';
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
}
