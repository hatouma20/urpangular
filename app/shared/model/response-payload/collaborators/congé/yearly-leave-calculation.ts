import {MonthlyLeaveCalculation} from './monthly-leave-calculation';

export class YearlyLeaveCalculation {
  constructor(
    public monthlycalculations: MonthlyLeaveCalculation,
    public yearlytotalcredit: number,
    public yearlytotalspending: number,
  ) {
  }
}
