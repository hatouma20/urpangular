import {CollaboratorBankAccount} from '../collaborator-Bank-Account';


export class TeamModel {
  constructor(
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public description: { value: string, dirty: boolean, class: string, error: string },
    public label: { value: string, dirty: boolean, class: string, error: string },
    public managerteam: {
       uuid: { value: string, dirty: boolean, class: string, error: string }
    }
  ) {
  }
}

