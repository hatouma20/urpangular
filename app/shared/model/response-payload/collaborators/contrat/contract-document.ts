import {CollaboratorModel} from '../collaborator-model';
import {Clause} from './clause';

export class ContractDocument {
  constructor(
    public clauses: Array<Clause>,
    public documentRefderence:	string,
    public id:	number,
    public uuid:	string,
  ) {
  }
}
