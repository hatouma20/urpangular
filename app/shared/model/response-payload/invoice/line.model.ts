export class LineModel {
  // get tva(): any {
  //   return this._tva;
  // }
  //
  // set tva(value: any) {
  //   this._tva = value;
  // }
  //
  // get prixnet(): any {
  //   return this._prixnet;
  // }
  //
  // set prixnet(value: any) {
  //   this._prixnet = value;
  // }
  public id: number
  public productname: any;
  public descriptionproduct: any;
  public quantite: any;
  public prixunitaire: any;
  public prixtotal: any;
  public tva: any;
  public prixnet: any;

  public subtotalprice: any;
  public subtotaldesc: any;
  public uuid: any;
  constructor(id: number, productname: any, descriptionproduct: any, quantite: any, prixunitaire: any, prixtotal: any, tva: any, prixnet: any, subtotalprice: any, subtotaldesc: any, uuid: any) {
    this.id = id;
    this.productname = productname;
    this.descriptionproduct = descriptionproduct;
    this.quantite = quantite;
    this.prixunitaire = prixunitaire;
    this.prixtotal = prixtotal;
    this.tva = tva;
    this.prixnet = prixnet;
    this.subtotalprice = subtotalprice;
    this.subtotaldesc = subtotaldesc;
    this.uuid = uuid;
  }

  //
  // get subtototalprice(): any {
  //   return this._subtototalprice;
  // }
  //
  // set subtototalprice(value: any) {
  //   this._subtototalprice = value;
  // }
  //
  // get subtototaldesc(): any {
  //   return this._subtototaldesc;
  // }
  //
  // set subtototaldesc(value: any) {
  //   this._subtototaldesc = value;
  // }
  //
  // get id(): number {
  //   return this.id;
  // }
  //
  // set id(value: number) {
  //   this.id = value;
  // }
  //
  // get productname(): any {
  //   return this._productname;
  // }
  //
  // set productname(value: any) {
  //   this._productname = value;
  // }
  //
  // get descriptionproduct(): any {
  //   return this._descriptionproduct;
  // }
  //
  // set descriptionproduct(value: any) {
  //   this._descriptionproduct = value;
  // }
  //
  // get quantite(): any {
  //   return this._quantite;
  // }
  //
  // set quantite(value: any) {
  //   this._quantite = value;
  // }
  //
  // get prixunitaire(): any {
  //   return this._prixunitaire;
  // }
  //
  // set prixunitaire(value: any) {
  //   this._prixunitaire = value;
  // }
  //
  // get prixtotal(): any {
  //   return this._prixtotal;
  // }
  //
  // set prixtotal(value: any) {
  //   this._prixtotal = value;
  // }
}
