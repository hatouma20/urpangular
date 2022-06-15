export class TransactionModel {
  constructor(
    public caisse:	string,
    public deadlinedate:	Date,
    public valueDate:	Date,
    public devise: string,
    public id:	number,
    public infosvirement:	string,
    public invoice:	string,
    public amount:	string,
    public nomtraite:	string,
    public numcheque:	string,
    public payType:	string,
    public status:	string,
    public uuid:	string,
    ) {
  }
}
