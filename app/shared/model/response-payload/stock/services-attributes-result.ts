import {StockAttributeForm} from '../../request-payload/stock/stock-attribut-form';
import {AddstockResult} from './add-stock-result';
export class ServicesAttributesResult {
  constructor( public attributes: Array<StockAttributeForm>,
               public booleanValue: boolean,
               public dateValue: string,
               public idservicetAttrbuteValue: string,
               public numericValue: string,
               public services: Array<AddstockResult>,
               public stringValue: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

