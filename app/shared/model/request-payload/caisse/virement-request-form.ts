 export class VirementRequestForm {
  constructor(
    public compteorigin: { value: string, dirty: boolean, class: string, error: string },
    public beneficiarys: { values: Array<
      { beneficiaryName: string,
        beneficiaryAccount: string,
        description: string,
        amount: number
      }>, dirty: boolean, class: string, error: string },
    public datevirement: { value: Date, dirty: boolean, class: string, error: string },
    public transfernumber: { value: string, dirty: boolean, class: string, error: string },
    public socialreason: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean) {
  }
}
