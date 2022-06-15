export class RetenueSourceModel {
  constructor(
    public amount:	string,
    public id: number,
    public invoice:	string,
    public isdeleted: boolean,
    public percentage:	number,
    public solde:	boolean,
    public status:	string,
    public tiers:	string,
    public uuid:	string,
    public valueDate:	Date,
  ) {
  }
}
