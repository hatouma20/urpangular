export class LeavingJobReasonDto {
  constructor(
    public description: { value: string, dirty: boolean, class: string, error: string },
    public id: string,
    public reason: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
