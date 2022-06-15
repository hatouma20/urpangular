import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {CollaboratorLeave} from '../../../../shared/model/response-payload/collaborators/congé/collaborator-leave';


@Component({
  selector: 'wind-collaboratorleave',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collaboratorleave.component.html',
  styleUrls: ['./collaboratorleave.component.css']
})

export class CollaboratorleaveComponent implements OnInit {
  editField: string;
  selectedMonthMoment: moment.Moment;
  // month: CollaboratorLeave = new CollaboratorLeave(
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: 0, dirty: false, class: '', error: ''},
  //   {value: 0, dirty: false, class: '', error: ''},
  //   {value: , dirty: false, class: '', error: ''},
  //   true
  // );
  @Input() locale: string;
  @Input() year: number;
  // @Input() month: number;

  @Input() enabledMonths: Array<number> = [];
  @Input() disabledMonths: Array<number> = [];

  @Input() enabledYears: Array<number> = [];
  @Input() disabledYears: Array<number> = [];

  @Input() multiple: boolean; // TODO

  // @Output() change = new EventEmitter<{ monthIndex: number, year: number }>();

  // model: MonthPickerModel;

  isShowYears: boolean;
  years: Array<number> = [];
  // @ts-ignore
  private awaitingPersonList: Array<any>;

  ngOnInit() {
    // if (this.locale) {
    //   moment.locale(this.locale);
    // } else {
    //   moment.locale('fr');
    // }
    //
    // this.model = new MonthPickerModel();
    //
    // if (this.year) {
    //   this.model.selectedYearMoment = moment().year(this.year);
    // }
    //
    // if (this.month) {
    //   // @ts-ignore
    //   this.model.selectedMonthIndex = this.month;
    //   // @ts-ignore
    //   this.model.selectedMonthMoment = moment().month(this.month);
    //   if (this.year) {
    //     this.model.selectedMonthYear = this.year;
    //   }
    // }
    //
    // this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  selectMonth(index: number) {
    // this.model.selectMonth(index);
    // this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  onChange(monthIndex: number, year: number) {
    // this.change.emit({monthIndex, year});
  }

  isDisabled(index: number) {
    let disabled = false;
    if (this.enabledMonths && this.enabledMonths.length > 0) {
      disabled = this.enabledMonths.indexOf(index) < 0;
    }
    if (this.disabledMonths && this.disabledMonths.length > 0) {
      disabled = this.disabledMonths.indexOf(index) >= 0;
    }
    return disabled;
  }

  isSelectedYear(year: number) {
    // return this.model.selectedYearMoment.year() === year;
  }

  isDisabledYear(year: number) {
    // console.warn(year)
    let disabled = false;
    if (this.enabledYears && this.enabledYears.length > 0) {
      disabled = this.enabledYears.findIndex(y => y === year) < 0;
    }
    if (this.disabledYears && this.disabledYears.length > 0) {
      disabled = this.disabledYears.findIndex(y => y === year) >= 0;
    }
    return disabled;
  }

  onFormSubmit() {
    // this.validateRequiredInputForm();
    // if (!this.FormIsValid()) {
    //   const shadesEl2 = document.querySelector('.alert-danger');
    //   shadesEl2.classList.add('show');
    //   return;
    // } else {
    //   this.submitForm();
    // }
  }

  updateList(i: number, id: number, property: string, event: any) {
    // const editField = event.target.textContent;
    // this.model.months[i].collaborator[id][property] = editField;
  }

  remove(i: number, id: any) {
    // this.awaitingPersonList.push(this.model.months[id]);
    // this.model.months[i].collaborator.splice(id, 1);
  }

  changeValue(i: number, id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  private submitForm() {
    // add collaboratorleave in calender
    // const itemUpdated = {
    //   collLeave: {value: this.month.collaborator.value, dirty: false, class: '', error: ''},
    //   logo: './assets/img/im1.png',
    //   // rate: {value: this.month.rate.value, dirty: false, class: '', error: ''}
    // };
    // const targetIdx = this.model.months.map(item => item.month.value).indexOf(moment.months(Number(this.month.month.value)));
    // this.model.months[targetIdx].collaborator[this.model.months[targetIdx].collaborator.length] = itemUpdated;
    // // end add collaboratorleave in calender
    //
    // // add class show alert
    // const shadesEl = document.querySelector('.alert-success');
    // shadesEl.classList.add('show');
  }

  // end add class show alert
  private FormIsValid() {
    // for (const element in this.month) {
    //   if (this.month[element].dirty) {
    //     this.month.isValid = false;
    //     break;
    //   } else {
    //     this.month.isValid = true;
    //     const shadesEl2 = document.querySelector('.alert-danger');
    //     shadesEl2.classList.remove('show');
    //   }
    // }
    // return this.month.isValid;
  }

  private validateRequiredInputForm() {
    // // tslint:disable-next-line:max-line-length
    // if (this.month.collaborator.value === '') {
    //   this.month.collaborator.dirty = true;
    //   this.month.collaborator.class = 'invalid';
    //   this.month.collaborator.error = 'Collaborator should not be empty';
    // } else {
    //   this.month.collaborator.dirty = false;
    //   this.month.collaborator.class = 'valid';
    //   this.month.collaborator.error = '';
    // }
    //
    // }
  }
}
// export class MonthPickerModel {
//   months: Array<any> = [];
//   selectedYearMoment: moment.Moment;
//   selectedYearText: string;
//   selectedMonthMoment: moment.Moment;
//   selectedMonthIndex: number;
//   selectedMonthYear: number;
//
//   constructor() {
//     this.selectedYearMoment = moment();
//     this.selectedMonthMoment = moment();
//     this.months.push({
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'omar', dirty: false, class: '', error: ''},
//             logo: './assets/img/user.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(0), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Anis', dirty: false, class: '', error: ''},
//             logo: './assets/img/im1.png',
//             rate: {value: '1', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(1), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Ibtissem', dirty: false, class: '', error: ''},
//             logo: './assets/img/im2.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(2), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Ibtissem', dirty: false, class: '', error: ''},
//             logo: './assets/img/im2.png',
//             rate: {value: '3', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(3), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'omar', dirty: false, class: '', error: ''},
//             logo: './assets/img/user.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(4), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'omar', dirty: false, class: '', error: ''},
//             logo: './assets/img/user.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(5), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Anis', dirty: false, class: '', error: ''},
//             logo: './assets/img/im1.png',
//             rate: {value: '3', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(6), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'omar', dirty: false, class: '', error: ''},
//             logo: './assets/img/user.png',
//             rate: {value: '1', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(7), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Ibtissem', dirty: false, class: '', error: ''},
//             logo: './assets/img/im2.png',
//             rate: {value: '1', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(8), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'Anis', dirty: false, class: '', error: ''},
//             logo: './assets/img/im1.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(9), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [
//           {
//             collLeave: {value: 'omar', dirty: false, class: '', error: ''},
//             logo: './assets/img/user.png',
//             rate: {value: '2', dirty: false, class: '', error: ''}
//           }
//         ],
//         month: {value: moment.months(10), dirty: false, class: '', error: ''}
//       },
//       {
//         // tslint:disable-next-line:max-line-length
//         collaborator: [],
//         month: {value: moment.months(11), dirty: false, class: '', error: ''}
//       },
//     );
//
//     this.selectedMonthIndex = this.selectedMonthMoment.month();
//     this.selectedMonthYear = this.selectedYearMoment.year();
//   }
//
//   selectMonth(index: number) {
//     this.selectedMonthMoment = moment().month(index);
//     this.selectedMonthIndex = this.selectedMonthMoment.month();
//     this.selectedMonthYear = this.selectedYearMoment.year();
//   }
//
// }
//
