export class MonthlyLeaveCalculation {
  constructor(
    public credit: number,
    public date: Date,
    public spent: number,
    public type: string,
  ) {
  }
}
