import { Injectable } from '@angular/core';
import {AddattributeResult} from '../../../response-payload/stock/add-attribute-result';
import { IDataAdapter } from './i-data-adapter';

@Injectable({
  providedIn: 'root'
})
export class AddAttributeAdapter implements IDataAdapter<AddattributeResult> {
  adapt(data: any): AddattributeResult {
    return new AddattributeResult(
      data.description,
      data.idattribute,
      data.label,
      data.status,
      data.uuid
    );
  }
}
