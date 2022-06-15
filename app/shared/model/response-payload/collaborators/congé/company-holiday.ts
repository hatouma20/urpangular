export class CompanyHoliday {
  constructor(
    public day: { value: string, dirty: boolean, class: string, error: string },
    public month: { value: string, dirty: boolean, class: string, error: string },
    public payed: { value: boolean, dirty: boolean, class: string, error: string },
    public title: { value: string, dirty: boolean, class: string, error: string },
    public total_days: { value: number, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
