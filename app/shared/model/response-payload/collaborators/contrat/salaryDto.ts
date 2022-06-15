import {TimeQuota} from './time-Quota';

export class SalaryDto {
  constructor(
    public baseSalary: number,
    public hourlyRate: number,
    public id: number,
    public monthlySchedule: number,
    public periodicityEnum: string,
    public prorata: number,
    public timeQuota: TimeQuota,
  ) {
  }
}
