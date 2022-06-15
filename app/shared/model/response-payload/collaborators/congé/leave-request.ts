import {Leave} from './leave';

export class LeaveRequest {
  constructor(
    public collaborator: { value: string, dirty: boolean, class: string, error: string },
    public company: { value: string, dirty: boolean, class: string, error: string },
    public determinedat: { value: Date, dirty: boolean, class: string, error: string },
    public enddate: { value: Date, dirty: boolean, class: string, error: string },
    public hours: { value: string, dirty: boolean, class: string, error: string },
    public manager: { value: string, dirty: boolean, class: string, error: string },
    public leave: { value: Leave, dirty: boolean, class: string, error: string },
    public reason: { value: string, dirty: boolean, class: string, error: string },
    public startdate: { value: Date, dirty: boolean, class: string, error: string },
    public status: { values: { pending: boolean, approved: boolean, denied: boolean }, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }

}
