export class TimeQuota {
  constructor(
    public created: Date,
    public creator: number,
    public id: number,
    public modified: Date,
    public modifier: number,
    public quota: string,
    public quotaRatio: number,
    public tenantId: number,
    public version: number,
  ) {
  }
}
