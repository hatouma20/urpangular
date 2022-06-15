export class BankAccountRequestForm {
  constructor(
    public tiers: { values: { uuid: string}, dirty: boolean, class: string, error: string },
    public bankAccountName: { value: string, dirty: boolean, class: string, error: string },
    public bank: { value: string, dirty: boolean, class: string, error: string },
    public accountNumber: { value: string, dirty: boolean, class: string, error: string },
    public iban: { value: string, dirty: boolean, class: string, error: string },
    public bicCode: { value: string, dirty: boolean, class: string, error: string },
    public domiciliation: { value: string, dirty: boolean, class: string, error: string },
    public ownerName: { value: string, dirty: boolean, class: string, error: string },
    public ownerAddress: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}

