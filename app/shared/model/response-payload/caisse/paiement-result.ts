export class PaiementResult {
  constructor( public paymentDate: string,
               public valueDate: string,
               public label: string,
               public sens: string,
               public amount: string,
               public bankAccount: string,
               public paymentMode: string,
               public checkNumber: string,
               public projet: string,
               public tags: string,
               public comptecomptable: string,
               public compteauxiliaire: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

