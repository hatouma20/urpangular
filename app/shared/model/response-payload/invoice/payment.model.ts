import {TransactionModel} from './transaction-model';

export class PaymentModel {
  constructor(
    public left_to_pay:	string,
    public percentage_rs:	string,
    public total_payed: string,
    public total_rs:	string,
    public transactions: Array<TransactionModel>,
    public sens: string,
  ) {
  }
}
