export class CurrencyResult {
  constructor( public name: string,
               public label: string,
               public exchangerate: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

