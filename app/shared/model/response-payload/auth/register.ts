
export class RegisterModel {
  constructor(
    public email: { value: string, dirty: boolean, class: string, error: string },
    public patent: { value: string, dirty: boolean, class: string, error: string },
    public trade_register: { value: string, dirty: boolean, class: string, error: string },

    public isValid: boolean
  ) {}
}
