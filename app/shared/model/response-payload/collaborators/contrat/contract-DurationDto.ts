export class ContractDurationDto {
  constructor(
    public description: { value: string, dirty: boolean, class: string, error: string },
    public duation: { value: string, dirty: boolean, class: string, error: string },
    public id: { value: string, dirty: boolean, class: string, error: string },
    public unit: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
