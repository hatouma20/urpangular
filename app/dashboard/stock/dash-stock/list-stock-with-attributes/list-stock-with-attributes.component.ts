import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {StockAttributeForm} from '../../../../shared/model/request-payload/stock/stock-attribut-form';
import {AddstockResult} from '../../../../shared/model/response-payload/stock/add-stock-result';
import {ProductsAttributesResult} from '../../../../shared/model/response-payload/stock/products-attributes-result';
import {ServicesAttributesResult} from '../../../../shared/model/response-payload/stock/services-attributes-result';
import {StockService} from '../../../../shared/services/back-end/stock/stock.service';
@Component({
  selector: 'wind-list-stock-with-attributes',
  templateUrl: './list-stock-with-attributes.component.html',
  styleUrls: ['./list-stock-with-attributes.component.scss']
})
export class ListStockWithAttributesComponent implements OnInit {
  editField: string;
  productsattributesResultList: Array<ProductsAttributesResult> = [];
  servicesattributesResultList: Array<ServicesAttributesResult> = [];
  servicesattributes: Array<StockAttributeForm> = [];
  productsattributes: Array<StockAttributeForm> = [];
  products: Array<AddstockResult> = [];
  services: Array<AddstockResult> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  constructor(private stockservice: StockService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.stockservice.getAllProductswithattributes().subscribe(response => {
      this.productsattributesResultList = response;
      this.productsattributesResultList.forEach(item =>
        item.attributes.forEach(item1 =>
          this.productsattributes.push(item1)
        )
      );
      this.dtTrigger.next();
    });
    this.stockservice.getAllServiceswithattributes().subscribe(response => {
      this.servicesattributesResultList = response;
      this.servicesattributesResultList.forEach(item =>
      item.attributes.forEach(item1 =>
      this.servicesattributes.push(item1)
      )
      );
      this.dtTrigger2.next();
    });
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.servicesattributesResultList[id][property] = editField;
  }
  remove(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteproduct(id).subscribe(response =>
      window.location.reload()
    );
  }
  removeservice(id: any) {
    this.stockservice.uuid = id;
    this.stockservice.deleteservice(id).subscribe(response =>
      window.location.reload()
    );
  }
}
