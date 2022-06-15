import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wind-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['card-payment.component.css', '../../../../../assets/css/mystyle.css']
})
export class CardPaymentComponent implements OnInit {
  @Output() resteapayer = new EventEmitter();
  @Input() line;
  @Input() reste;
  @Input() disabled;
  @Input('lastIndex') lastIndex;
  @Input() listeLine;
  @Input() RS_model;
  montantsaisie: any = 0.0;
  private oldLeftToPay: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.line);
    this.oldLeftToPay = this.reste;
  }

  saisirMontant(index) {
    let totalmontantsaisi = 0;
    let reste = 0;
    this.listeLine.forEach(elt => {
      totalmontantsaisi = totalmontantsaisi + elt.amount;
    });
    if (this.RS_model.amount !== '') {
      reste = Number(this.oldLeftToPay) - (Number(totalmontantsaisi) + Number(this.RS_model.amount));
    } else {
      reste = Number(this.oldLeftToPay) - Number(totalmontantsaisi);
    }
    if (reste < 0) {
      document.querySelector('#alert-danger' + index).classList.add('show');
      this.line.amount = '';
    } else {
      this.montantsaisie = this.line.amount;
      document.querySelector('#alert-danger' + index).classList.remove('show');
      this.resteapayer.emit(reste);
    }
  }
}
