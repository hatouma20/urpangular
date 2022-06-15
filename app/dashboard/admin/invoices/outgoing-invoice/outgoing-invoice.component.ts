import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentType} from '../../../../shared/constants/payment-type';
import {TransactionModel} from '../../../../shared/model/response-payload/invoice/transaction-model';
import {BuillingService} from '../../../../shared/services/back-end/builling/builling.service';
import {PayrollService} from '../../../../shared/services/back-end/payroll/payroll.service';

@Component({
  selector: 'wind-Outgoing-Invoice',
  templateUrl: './outgoing-invoice.component.html',
  styleUrls: ['outgoing-invoice.component.css', '../../../../../assets/css/mystyle.css']
})
export class OutgoingInvoiceComponent implements OnInit {
  paymentTypeEnum = PaymentType;
  @Output() resteapayer = new EventEmitter();
  @Output() ListTransactionForPayment = new EventEmitter();
  @Input() oldlefttopay;
  @Input() RS_model;
  @Input() invoice;
  facturelist: Array<TransactionModel> = [];
  resteAPayerTotal: any;
  listTransactions = [];
  disabled = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private payrollService: PayrollService,
    private buillingService: BuillingService,
    ) {
  }
  ngOnInit(): void {
    console.log(this.RS_model);
    this.buillingService.getPayedTransactions(this.invoice.uuid).subscribe( resp => {
      this.listTransactions = resp;
    });
    this.payrollService.getAllTransactions().subscribe(response => {
      console.log(response);
    });
  }
  /*_____________________________________________________*/

  addLine(type: string) {
    document.querySelector('#alert-required-vide').classList.remove('show');
    const id = this.facturelist.length;
    let totalmontantsaisi = 0;
    this.facturelist.forEach(elt => {
      totalmontantsaisi = totalmontantsaisi + Number(elt.amount);
    });
    const reste = Number(this.oldlefttopay) - Number(totalmontantsaisi);
    if (reste > 0) {
    this.facturelist.push(new TransactionModel('', null, null, '', id, '', this.invoice.uuid,  '', '', '', type, 'VALIDE', ''));
    }
  }
  remove(id: any ) {
    this.facturelist.splice(id, 1);
    let totalmontantsaisi = 0;
    let reste = 0;
    this.facturelist.forEach(elt => {
      totalmontantsaisi = totalmontantsaisi + Number(elt.amount);
    });
    if (this.RS_model.amount !== '') {
     reste = Number(this.oldlefttopay) - (Number(totalmontantsaisi) + Number(this.RS_model.amount));
    } else {
      reste = Number(this.oldlefttopay) - Number(totalmontantsaisi);
    }
    this.resteAPayerTotal = reste;
    this.resteapayer.emit(reste);
  }
  getUpdatedvalue(event: any, id: number) {
    this.resteAPayerTotal = event ;
    this.resteapayer.emit(event);
  }
  getUpdatedListTransaction(event: any, id: number) {
    this.ListTransactionForPayment.emit(event);
  }
}
