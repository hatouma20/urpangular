import {LeaveType} from '../../../../constants/leave-type';

export class Leave {
  constructor(
    public active: { value: boolean, dirty: boolean, class: string, error: string },
    public days_in_advance: { value: number, dirty: boolean, class: string, error: string },
    public deductible: { value: boolean, dirty: boolean, class: string, error: string },
    public full_day: { value: boolean, dirty: boolean, class: string, error: string },
    public negative_credit: { value: boolean, dirty: boolean, class: string, error: string },
    public partial_day: { value: boolean, dirty: boolean, class: string, error: string },
    public simultaneously_limit: { value: number, dirty: boolean, class: string, error: string },
    public type: { value: string, dirty: boolean, class: string, error: string },
    public custom_type: { value: string, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public max_days: { value: number, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {}

}
