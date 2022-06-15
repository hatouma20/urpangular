export class PartnerAddressModel {
  constructor(
    public country: { value: string, dirty: boolean, class: string, error: string },
    public main: { value: boolean, dirty: boolean, class: string, error: string },
    public text: { value: string, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public zip_code: { value: number, dirty: boolean, class: string, error: string },
  ) {
  }
}
