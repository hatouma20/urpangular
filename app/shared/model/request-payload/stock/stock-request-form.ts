import {StockAddForm} from './stock-add-form';
import {StockAttributeForm} from './stock-attribut-form';

export class StockRequestForm {
  constructor(public description: { value: string, dirty: boolean, class: string, error: string },
              public nom: { value: string, dirty: boolean, class: string, error: string },
              public attributes: { values: Array<StockAttributeForm>, dirty: boolean, class: string, error: string },
              public isActive: { value: boolean, dirty: boolean, class: string, error: string },
              public priceIn: { value: string, dirty: boolean, class: string, error: string },
              public priceOut: { value: string, dirty: boolean, class: string, error: string },
              public image: { value: string, dirty: boolean, class: string, error: string },
              public stock: { value: string, dirty: boolean, class: string, error: string },
              public supplier: { value: string, dirty: boolean, class: string, error: string },
              public uuid: { value: string, dirty: boolean, class: string, error: string },
              public isValid: boolean) {
  }
}
