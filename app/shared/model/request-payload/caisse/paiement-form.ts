export class PaiementRequestForm {
  constructor(
    public datepaiement: { value: Date, dirty: boolean, class: string, error: string },
    public datevaleur: { value: Date, dirty: boolean, class: string, error: string },
    public libelle: { value: string, dirty: boolean, class: string, error: string },
    public sens: { value: string, dirty: boolean, class: string, error: string },
    public montant: { value: number, dirty: boolean, class: string, error: string },
    public compte: { value: string, dirty: boolean, class: string, error: string },
    public mode: { value: string, dirty: boolean, class: string, error: string },
    public numcheque: { value: string, dirty: boolean, class: string, error: string },
    public projet: { value: string, dirty: boolean, class: string, error: string },
    public tags: { value: string, dirty: boolean, class: string, error: string },
    public comptecomptable: { value: string, dirty: boolean, class: string, error: string },
    public compteauxiliaire: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
