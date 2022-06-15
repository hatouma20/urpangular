import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, setDate,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'wind-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: '7h',
      color: colors.blue,
    },
    // {
    //   start: new Date(new Date().getDate() + 1),
    //   title: '10h',
    //   color: colors.blue,
    // },
    // {
    //   start: setDate(new Date().getDate() + 2),
    //   title: '12h',
    //   color: colors.blue,
    // },
    // {
    //   start: new Date(new Date().getDate() + 3),
    //   title: '12h',
    //   color: colors.blue,
    // },
  ];

  activeDayIsOpen: boolean = true;
  rttList: Array<any> = [];
  constructor( private modalService: NgbModal,
  ) {
  }
  ngOnInit(): void {
    this.rttList = [
      {
        collaborator: {
          address: 'Adresse',
          attachementCinBack: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1_verscin.jpg',
          attachementCinFront: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1_rectcin.png',
          city: 'Ville',
          civilState: 'CELIBATAIRE',
          civilstate: 'CELIBATAIRE',
          collaboratorBankAccount: {
            accountnumber: '01234560099874223212',
            bankname: 'baraka',
            id: 133,
            uuid: '5813c112-81f7-4905-80c8-cf925a19a392',          },
          country: '',
          created: '2020-08-31T09:48:34.559+0000',
          dateOfBirth: '2005-02-19',
          dateOfCin: '2020-10-11',
          deleted: false,
          faxNumber: '',
          firstname: 'wifek',
          hearingreason: null,
          idCardNumber: '06931234',
          isDeleted: false,
          lastname: 'abdelhak',
          leavingreason: null,
          maidenName: 'aaa',
          matricule: '0000',
          mobileNumber: '24657708',
          nationality: 'Tunisian',
          passportId: '',
          personalEmail: 'test@test.com',
          personalPicture: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1_avatar.png',
          phoneNumber: '2498465',
          postalCode: '',
          proEmail: 'wifek@mail.com',
          salutation: 'MRS',
          socialSecurityNumber: '0123698756',
          state: '',
          team: null,
          teamBoss: false,
          uuid: '2d1ebc5b-7d27-4197-9cf0-e84451c5bbb1',
              },
        rttcalculation: 30,
        rtthistory: []
      }
    ];
  }
  open(content: any) {
    this.modalService.open(content,  {size: 'xl'});
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onFormSubmit() {
  }
}
