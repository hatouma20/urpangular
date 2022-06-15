export class ChequeRequestForm {
  constructor(
    public datecheque: { value: Date, dirty: boolean, class: string, error: string },
    public numcheque: { value: string, dirty: boolean, class: string, error: string },
    public transmitter: { value: string, dirty: boolean, class: string, error: string },
    public montant: { value: number, dirty: boolean, class: string, error: string },
    public compte: { value: string, dirty: boolean, class: string, error: string },
    public reglement: { value: string, dirty: boolean, class: string, error: string },
    public ecriture: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
