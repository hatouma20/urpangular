import {CollaboratorModel} from '../collaborator-model';

export class DepatementModel {
  constructor(
    public description: string,
    public id: number,
    public manager: CollaboratorModel,
    public name: string
  ) {
  }
}
