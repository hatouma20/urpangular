export class PaiementRequestForm {
  constructor(
    public paymentDate: { value: Date, dirty: boolean, class: string, error: string },
    public valueDate: { value: Date, dirty: boolean, class: string, error: string },
    public label: { value: string, dirty: boolean, class: string, error: string },
    public sens: { value: string, dirty: boolean, class: string, error: string },
    public amount: { value: number, dirty: boolean, class: string, error: string },
    public bankAccount: { value: string, dirty: boolean, class: string, error: string },
    public paymentMode: { value: string, dirty: boolean, class: string, error: string },
    public checkNumber: { value: string, dirty: boolean, class: string, error: string },
    public projet: { value: string, dirty: boolean, class: string, error: string },
    public tags: { value: string, dirty: boolean, class: string, error: string },
    public comptecomptable: { value: string, dirty: boolean, class: string, error: string },
    public compteauxiliaire: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
