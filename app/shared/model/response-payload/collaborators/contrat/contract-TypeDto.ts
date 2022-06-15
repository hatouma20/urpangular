export class ContractTypeDto {
  constructor(
    public description: { value: string, dirty: boolean, class: string, error: string },
    public id: { value: string, dirty: boolean, class: string, error: string },
    public type: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean,
  ) {
  }
}
