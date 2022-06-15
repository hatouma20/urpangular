export class CompteFinanceRequestForm {
  constructor(
    public ref: { value: string, dirty: boolean, class: string, error: string },
    public libelle: { value: string, dirty: boolean, class: string, error: string },
    public typecompte: { value: string, dirty: boolean, class: string, error: string },
    public devise: { value: string, dirty: boolean, class: string, error: string },
    public etat: { value: string, dirty: boolean, class: string, error: string },
    public country: { value: string, dirty: boolean, class: string, error: string },
    public departement: { value: string, dirty: boolean, class: string, error: string },
    public web: { value: string, dirty: boolean, class: string, error: string },
    public comment: { value: string, dirty: boolean, class: string, error: string },
    public soldeinitial: { value: number, dirty: boolean, class: string, error: string },
    public soldeminimumautorise: { value: number, dirty: boolean, class: string, error: string },
    public bank: { value: string, dirty: boolean, class: string, error: string },
    public accountNumber: { value: string, dirty: boolean, class: string, error: string },
    public swift: { value: string, dirty: boolean, class: string, error: string },
    public ownerName: { value: string, dirty: boolean, class: string, error: string },
    public ownerAddress: { value: string, dirty: boolean, class: string, error: string },
    public comptecomptable: { value: string, dirty: boolean, class: string, error: string },
    public codejournalcomptable: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
