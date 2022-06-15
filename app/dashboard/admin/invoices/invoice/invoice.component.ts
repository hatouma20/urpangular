import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatStepper} from "@angular/material/stepper";
import {ClientModel} from '../../../../shared/model/response-payload/invoice/client.model';

@Component({

  selector: 'wind-Invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['invoice.component.css'],

})

export class InvoiceComponent implements OnInit {

  @Input('clientModel') clientModel: ClientModel;
  @Output() valueUpdate = new EventEmitter();



  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let logo = this.clientModel.logo;
  }

  closecomponent(content) {
    this.modalService.dismissAll(content);
  }

  opencomponent(content) {
    this.modalService.open(content, {size: 'xxl'});
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

}
