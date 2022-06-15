

export class AddDepotResult {
  constructor(
    public address: { value: string; dirty: boolean; error: string; class: string },
    public city: { dirty: boolean; error: string; value: string; class: string },
    public country: { dirty: boolean; error: string; value: string; class: string },
    public description: { dirty: boolean; error: string; value: string; class: string },

    public fax: { dirty: boolean; error: string; value: string; class: string },
    public id_warehouse: { dirty: boolean; error: string; value: number; class: string },

    public name: { dirty: boolean; error: string; value: string; class: string },
    public phoneNumber: { dirty: boolean; error: string; value: string; class: string },
    public postalCode: { dirty: boolean; error: string; value: string; class: string },
    public reference: { dirty: boolean; error: string; value: number; class: string },
    public status: { dirty: boolean; error: string; value: number; class: string },
    public uuid: { dirty: boolean; error: string; value: string; class: string },
  ) {
  }
}
