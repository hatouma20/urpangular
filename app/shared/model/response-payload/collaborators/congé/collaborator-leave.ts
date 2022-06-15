import {Companyleaverule} from './companyleaverule';

export class CollaboratorLeave {
  constructor(
    public collaborator: { value: string, dirty: boolean, class: string, error: string },
    public current_payed_leave_credit: { value: number, dirty: boolean, class: string, error: string },
    public current_sick_leave_credit: { value: number, dirty: boolean, class: string, error: string },
    //public rules: { value: Companyleaverule[], dirty: boolean, class: string, error: string },
    public sickLeave_rule: {value: Companyleaverule[], dirty: boolean, class: string, error: string},
    public payed_rule: {value: Companyleaverule[], dirty: boolean, class: string, error: string},
    public isValid: boolean
  ) {
  }
}
