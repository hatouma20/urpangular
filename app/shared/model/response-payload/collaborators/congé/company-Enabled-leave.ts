export class CompanyEnabledLeave {
  constructor(
    public types: { value: Array<string>, dirty: boolean, class: string, error: string },
    public totalday: { value: string, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
