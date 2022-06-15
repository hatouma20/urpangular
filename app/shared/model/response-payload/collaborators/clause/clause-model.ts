export class ClauseModel {
  constructor(
    public clauseNumber:	string,
    public clauseText:	string,
    public id:	number,
    public parameters: Array<string>,
    public title:	string,
    public uuid:	string, ) {
}
}
