import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FundService} from '../../../services/back-end/fund/fund.service';

@Component({
  selector: 'wind-virement-payment',
  templateUrl: './virement-payment.component.html',
  styleUrls: ['virement-payment.component.css', '../../../../../assets/css/mystyle.css']
})
export class VirementPaymentComponent implements OnInit {
  @Output() resteapayer = new EventEmitter();
  @Output() listTransactions = new EventEmitter();
  @Input() line ;
  @Input() reste ;
  @Input() RS_model;
  @Input() disabled ;
  @Input('lastIndex') lastIndex;
  @Input() listeLine;
  @Input() invoice ;
  montantsaisie: any = 0.0;
  private oldLeftToPay: any;
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
    }
  }
  changeValues(index) {
    document.querySelector('#alert-required' + index).classList.remove('show');
    document.querySelector('#alert-required-vide').classList.remove('show');
    this.listTransactions.emit(this.listeLine);
  }
}

