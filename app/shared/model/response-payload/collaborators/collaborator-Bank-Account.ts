export class CollaboratorBankAccount {
  constructor(
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public accountnumber: { value: string, dirty: boolean, class: string, error: string },
    public bankname: { value: string, dirty: boolean, class: string, error: string }
  ) {}
}
