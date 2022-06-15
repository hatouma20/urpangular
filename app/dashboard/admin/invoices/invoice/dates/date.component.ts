import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({

  selector: 'wind-date',
  templateUrl: './date.component.html',
  styleUrls: ['date.component.css'],
  styles: []
})

export class DateComponent implements OnInit {
 @Input() dateFrom;
 @Input() dateFromlivraison;
 @Input() dateFromeche;
  @Output() dateInvoice = new EventEmitter();
  @Output() dateLivraison = new EventEmitter();
  @Output() dateEchec = new EventEmitter();
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const day = new Date().getDate();
    let daystring = '';  let monthstring = '';

    const year = new Date().getFullYear();
    const moth = new Date().getMonth() + 1;
    if (day < 10 ) {
      daystring = '0' + day;
    } else {
      daystring = '' + day;
    }

    if (moth < 10 ) {
      monthstring = '0' + moth;
    } else {
      monthstring = '' + moth;
    }

    this.dateFrom = year + '-' + monthstring + '-' + daystring;
    this.dateFromlivraison = year + '-' + monthstring + '-' + daystring;
    this.dateFromeche = year + '-' + monthstring + '-' + daystring;
  }


  getdateFrom(e: Event) {
    this.dateInvoice.emit(this.dateFrom);
  }

  getdateFromeche(e: Event) {
    this.dateEchec.emit(this.dateFromeche);
  }

  getdateFromlivraison(e: Event) {
    this.dateLivraison.emit(this.dateFromlivraison);
  }
}
