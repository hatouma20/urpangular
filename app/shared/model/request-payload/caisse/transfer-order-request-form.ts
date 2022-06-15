 export class TransferOrderRequestForm {
  constructor(
    public beneficiaryName: { value: string, dirty: boolean, class: string, error: string },
    public beneficiaryAccount: { value: string, dirty: boolean, class: string, error: string },
    public description: { value: string, dirty: boolean, class: string, error: string },
    public amount: { value: number, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
