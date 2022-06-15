import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LineModel} from '../../../model/response-payload/invoice/line.model';
import {FundService} from '../../../services/back-end/fund/fund.service';

@Component({
  selector: 'wind-espece-payment',
  templateUrl: './espece-payment.component.html',
  styleUrls: ['espece-payment.component.css', '../../../../../assets/css/mystyle.css']
})
export class EspecePaymentComponent implements OnInit {
  @Output() resteapayer = new EventEmitter();
  @Output() listTransactions = new EventEmitter();
  @Input() line ;
  @Input() disabled ;
  @Input() reste ;
  @Input() invoice ;
  @Input('lastIndex') lastIndex;
  @Input() listeLine;
  @Input() RS_model;
  montantsaisie: any = 0.0;
  oldLeftToPay: any;
  listeCaisses = [];
  constructor(private fundService: FundService) {
  }
  ngOnInit(): void {
    console.log(this.line);
    this.oldLeftToPay = this.reste;
    this.fundService.getAllCaisses().subscribe(response => {
      this.listeCaisses = response;
    });
  }
  saisirMontant(index) {
    document.querySelector('#alert-required' + index).classList.remove('show');
    document.querySelector('#alert-required-vide').classList.remove('show');
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
        this.listTransactions.emit(this.listeLine);
      }
    }

  changeValues(index) {
    this.listTransactions.emit(this.listeLine);
    document.querySelector('#alert-required' + index).classList.remove('show');
    document.querySelector('#alert-required-vide').classList.remove('show');
  }
}

