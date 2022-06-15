import {CollaboratorModel} from '../collaborator-model';
export class Clause {
  constructor(
    public clauseNumber:	string,
    public clauseText:	string,
    public created:	string,
    public creator:	number,
    public id:	number,
    public modified:	number,
    public modifier:	number,
    public parameters:	Array<string>,
    public tenantId:	number,
    public title:	string,
    public uuid:	string,
    public version:	number,
  ) {
  }
}
