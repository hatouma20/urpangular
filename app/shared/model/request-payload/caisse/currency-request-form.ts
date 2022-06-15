export class CurrencyRequestForm {
  constructor(
    public name: { value: string, dirty: boolean, class: string, error: string },
    public label: { value: string, dirty: boolean, class: string, error: string },
    public exchangeRate: { value: number, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
