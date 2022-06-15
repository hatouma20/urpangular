export class PaiementResult {
  constructor( public datepaiement: string,
               public datevaleur: string,
               public libelle: string,
               public sens: string,
               public montant: string,
               public compte: string,
               public mode: string,
               public numcheque: string,
               public projet: string,
               public tags: string,
               public comptecomptable: string,
               public compteauxiliaire: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

