export class TrialPeriodDto {
  constructor(
    public description: string,
    public duation: number,
    public id: number,
    // tslint:disable-next-line:variable-name
    public period_end: Date,
    // tslint:disable-next-line:variable-name
    public period_start: Date,
    public unit: string,
  ) {
  }
}
