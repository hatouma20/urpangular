import {CollaboratorModel} from '../collaborator-model';

export class RttModel {
  constructor(
    public collaborator: CollaboratorModel,
    public rttcalculation: { value: number, dirty: boolean, class: string, error: string },
    public rtthistory: { value: Array<{day: string, total: number}>, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {}
}
