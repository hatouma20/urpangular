export class CompteResult {
  constructor( public ref: string,
               public libelle: string,
               public typecompte: string,
               public currency: string,
               public etat: string,
               public country: string,
               public departement: string,
               public web: string,
               public comment: string,
               public soldeinitial: string,
               public datecompte: string,
               public soldeminimumautorise: string,
               public bank: string,
               public accountNumber: string,
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

