export class CompteResult {
  constructor( public ref: string,
               public label: string,
               public accountType: string,
               public currency: string,
               public state: string,
               public country: string,
               public departement: string,
               public web: string,
               public comment: string,
               public initialAmount: string,
               public datecompte: string,
               public minimalAmount: string,
               public bankName: string,
               public bankAccount: string,
               public swift: string,
               public domiciliation: string,
               public ownerName: string,
               public ownerAddress: string,
               public comptecomptable: string,
               public codejournalcomptable: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

