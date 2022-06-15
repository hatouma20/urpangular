export class StockAttributeForm {
  constructor(public description: { value: string, dirty: boolean, class: string, error: string },
              public idattribute: { value: string, dirty: boolean, class: string, error: string },
              public label: { value: string, dirty: boolean, class: string, error: string },
              public status: { value: boolean, dirty: boolean, class: string, error: string },
              public typevalue: { value: string, dirty: boolean, class: string, error: string },
              public uuid: { value: string, dirty: boolean, class: string, error: string },
              public isValid: boolean) {
  }
}
