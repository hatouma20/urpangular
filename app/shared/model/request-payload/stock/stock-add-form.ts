import {StockAttributeForm} from './stock-attribut-form';
import {StockRequestForm} from './stock-request-form';

export class StockAddForm {
  constructor(public stringValue: { value: string, dirty: boolean, class: string, error: string },
              public numericValue: { value: string, dirty: boolean, class: string, error: string },
              public booleanValue: { value: boolean, dirty: boolean, class: string, error: string },
              public dateValue: { value: Date, dirty: boolean, class: string, error: string },
              public attributes: { values: Array<StockAttributeForm>, dirty: boolean, class: string, error: string },
              public products: { values: Array<StockRequestForm>, dirty: boolean, class: string, error: string },
              public isValid: boolean) {
  }
}


// "accounting_Code_Export_Sale": "string",
//   "accounting_Code_Purchase": "string",
//   "accounting_Code_Purchase_Import": "string",
//   "accounting_Code_Sale": "string",
//   "barcode_Type": "string",
//   "barcode_Value": "string",
//   "buying_Price": 0,
//   "description": "string",
//   "douanière": "string",
//   "fix_Sale_Price": true,
//   "gain_Margin": 0,
//   "height": 0,
//   "id_product": 0,
//   "images": [
//   "string"
// ],
//   "label": "string",
//   "length": 0,
//   "length_Unit": "string",
//   "lots_Series": "string",
//   "min_Stock": 0,
//   "name": "string",
//   "nature_of_Product": "string",
//   "note": "string",
//   "origin_Country": "string",
//   "ref": "string",
//   "selling_Price": 0,
//   "selling_Price_Min": 0,
//   "selling_Type": 0,
//   "state_Purchase": "string",
//   "state_Sale": "string",
//   "stock": 0,
//   "supplier": "string",
//   "surface": 0,
//   "surface_Unit": "string",
//   "tva": 0,
//   "uuid": "string",
//   "volume": 0,
//   "volume_Unit": "string",
//   "warehouses": [
//   {
//     "address": "string",
//     "city": "string",
//     "country": "string",
//     "created": "2020-08-03T08:43:16.912Z",
//     "creator": 0,
//     "description": "string",
//     "fax": "string",
//     "id_warehouse": 0,
//     "modified": "2020-08-03T08:43:16.912Z",
//     "modifier": 0,
//     "name": "string",
//     "phoneNumber": "string",
//     "postalCode": "string",
//     "reference": "string",
//     "status": "string",
//     "tenantId": 0,
//     "uuid": "string",
//     "version": 0
//   }
// ],
//   "weight": 0,
//   "weight_Unit": "string",
//   "width": 0
