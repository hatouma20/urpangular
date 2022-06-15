export class InvoiceModel {
  constructor(
    public customerRib: { value: string, dirty: boolean, class: string, error: string },
    public invoicetype: { value: string, dirty: boolean, class: string, error: string },
    public total: { value: string, dirty: boolean, class: string, error: string },
    public timbre: { value: string, dirty: boolean, class: string, error: string },
    public color: { value: string, dirty: boolean, class: string, error: string },
    public customer: { value: string, dirty: boolean, class: string, error: string },
    public customerAdress: { value: string, dirty: boolean, class: string, error: string },
    public deliveryDate: { value: Date, dirty: boolean, class: string, error: string },
    public devise: { value: string, dirty: boolean, class: string, error: string },
    public dueDate: { value: Date, dirty: boolean, class: string, error: string },
    public total_htt: { value: number, dirty: boolean, class: string, error: string },
    public total_ttc: { value: number, dirty: boolean, class: string, error: string },
    public invoiceDate: { value: Date, dirty: boolean, class: string, error: string },
    public invoiceNumber: { value: number, dirty: boolean, class: string, error: string },
    public langue: { value: string, dirty: boolean, class: string, error: string },

    public LineModel: [{
      id: { value: number, dirty: boolean, class: string, error: string },
      prixnet: { value: number, dirty: boolean, class: string, error: string },
      prixtotal: { value: number, dirty: boolean, class: string, error: string },
      prixunitaire: { value: number, dirty: boolean, class: string, error: string },
      productdescription: { value: string, dirty: boolean, class: string, error: string },
      productname: { value: string, dirty: boolean, class: string, error: string },
      quantite: { value: number, dirty: boolean, class: string, error: string },
      tva: { value: number, dirty: boolean, class: string, error: string },
      subtotalprice: { value: number, dirty: boolean, class: string, error: string },
      subtotaldesc: { value: string, dirty: boolean, class: string, error: string },
    }],

    public model: { value: number, dirty: boolean, class: string, error: string },
    public note: { value: string, dirty: boolean, class: string, error: string },
    public partner: { value: string, dirty: boolean, class: string, error: string },
    public partnerAdress: { value: string, dirty: boolean, class: string, error: string },
    public partnerRIB: { value: string, dirty: boolean, class: string, error: string },
    public purchaseType: { value: string, dirty: boolean, class: string, error: string },
    public status: { value: string, dirty: boolean, class: string, error: string },
    public tva: { value: boolean, dirty: boolean, class: string, error: string }
  ) {}
}
