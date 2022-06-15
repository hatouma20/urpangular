import { Injectable } from '@angular/core';
import {AddstockResult} from '../../../response-payload/stock/add-stock-result';
import { IDataAdapter } from './i-data-adapter';

@Injectable({
  providedIn: 'root'
})
export class AddStockAdapter implements IDataAdapter<AddstockResult> {
  adapt(data: any): AddstockResult {
    return new AddstockResult(data.description, data.nom, data.attributes, data.isActive, data.priceIn, data.priceOut, data.image, data.sku, data.stock, data.supplier, data.uuid);
  }
}
