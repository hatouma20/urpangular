
export class PartnerRibModel {
  constructor(
    public bank_name: { value: string, dirty: boolean, class: string, error: string },
    public rib: { value: string, dirty: boolean, class: string, error: string },
    public main: { value: boolean, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
  ) {
  }
}
