export class ChequeResult {
  constructor( public datecheque: string,
               public numcheque: string,
               public transmitter: string,
               public montant: string,
               public compte: string,
               public reglement: string,
               public ecriture: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

