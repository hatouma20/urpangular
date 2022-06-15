
export class ResetModel {
  constructor(
    public email: { value: string, dirty: boolean, class: string, error: string },
    public password: { value: string, dirty: boolean, class: string, error: string },
    public confirmpassword: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
    ) {}
}
