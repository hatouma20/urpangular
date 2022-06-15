export class DepotForm {

  constructor(
    public address: { value: string, dirty: boolean; error: string; class: string },
    public city: { value: string, dirty: boolean; error: string; class: string },
    public country: { value: string, dirty: boolean; error: string; class: string },
    public created: { value: Date, dirty: boolean, class: string, error: string },
    public creator: { value: boolean, dirty: boolean, class: string, error: string },
    public description: { value: string, dirty: boolean; error: string; class: string },
    public fax: { value: string, dirty: boolean; error: string; class: string },
    public id_warehouse: { value: number, dirty: boolean; error: string; class: string },
    public modified: { value: Date, dirty: boolean; error: string; class: string },
    public modifier: { value: number, dirty: boolean; error: string; class: string },
    public name: { value: string, dirty: boolean; error: string; class: string },
    public phoneNumber: { value: string, dirty: boolean; error: string; class: string },
    public postalCode: { value: string, dirty: boolean; error: string; class: string },
    public reference: { value: string, dirty: boolean; error: string; class: string },
    public status: { value: string, dirty: boolean; error: string; class: string },
    public tenantId: { value: number, dirty: boolean; error: string; class: string },
    public uuid: { value: string, dirty: boolean; error: string; class: string },
    public version: { value: number, dirty: boolean; error: string; class: string },
  ) {}
}



