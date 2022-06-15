export class CompteFinanceRequestForm {
  constructor(
    public ref: { value: string, dirty: boolean, class: string, error: string },
    public label: { value: string, dirty: boolean, class: string, error: string },
    public accountType: { value: string, dirty: boolean, class: string, error: string },
    public currency: { value: string, dirty: boolean, class: string, error: string },
    public state: { value: string, dirty: boolean, class: string, error: string },
    public country: { value: string, dirty: boolean, class: string, error: string },
    public departement: { value: string, dirty: boolean, class: string, error: string },
    public web: { value: string, dirty: boolean, class: string, error: string },
    public comment: { value: string, dirty: boolean, class: string, error: string },
    public initialAmount: { value: number, dirty: boolean, class: string, error: string },
    public minimalAmount: { value: number, dirty: boolean, class: string, error: string },
    public bankName: { value: string, dirty: boolean, class: string, error: string },
    public accountNumber: { value: string, dirty: boolean, class: string, error: string },
    public swift: { value: string, dirty: boolean, class: string, error: string },
    public ownerName: { value: string, dirty: boolean, class: string, error: string },
    public ownerAddress: { value: string, dirty: boolean, class: string, error: string },
    public accountingAccount: { value: string, dirty: boolean, class: string, error: string },
    public accountingAccountCode: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
