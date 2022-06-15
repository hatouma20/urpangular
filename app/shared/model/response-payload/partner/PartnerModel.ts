
export class PartnerModel {
  constructor(
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public email: { value: string, dirty: boolean, class: string, error: string },
    public trade_register: { value: string, dirty: boolean, class: string, error: string },
    public tenant_id: { value: number, dirty: boolean, class: string, error: string },
    public patent: { value: string, dirty: boolean, class: string, error: string },
    public logo: { value: string, dirty: boolean, class: string, error: string },
    public patent_asset: { value: string, dirty: boolean, class: string, error: string },
    public trade_registry_asset: { value: string, dirty: boolean, class: string, error: string },
    public company_name: { value: string, dirty: boolean, class: string, error: string },
    public phone_number: { value: string, dirty: boolean, class: string, error: string },
    public web_site: { value: string, dirty: boolean, class: string, error: string },
  ) {
  }
}
