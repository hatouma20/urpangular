import { Component, OnInit } from '@angular/core';
import {AddstockResult} from '../../../../shared/model/response-payload/stock/add-stock-result';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {StockService} from '../../../../shared/services/back-end/stock/stock.service';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'wind-list-stock-component',
  templateUrl: './list-stock-component.component.html',
  styleUrls: ['./list-stock-component.component.scss']
})
export class ListStockComponentComponent implements OnInit {
  editField: string;
  errorMessage: string;
  stocklist: Array<any> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  servicelist: Array<AddstockResult> = [];

  constructor(private stockservice: StockService, private modalService: NgbModal, private  tiersservice: FournisseurService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.stockservice.getAllProducts().map(ProductsResponse => {
      this.stocklist = ProductsResponse;
      this.dtTrigger.next();
      return this.stocklist;
    }).flatMap((stockList, index) => {
      stockList.forEach(product => {
        this.tiersservice.gettiers(product.supplier).subscribe(suplierResponse => {
          product.suppliername = suplierResponse.name;
        });
      });
      return Observable.of(stockList);
    }).subscribe(value => value);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.stocklist[id][property] = editField;
    const currentTeam = this.stocklist[id];
    this.stockservice.update(currentTeam).subscribe(response =>
      console.log(response)
    );
  }
  remove(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteproduct(id).subscribe(response =>
      window.location.reload()
    );
  }
  open(content) {
    this.modalService.open(content);
  }
  removeservice(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteservice(id).subscribe(response =>
      window.location.reload()
    );
  }
}
