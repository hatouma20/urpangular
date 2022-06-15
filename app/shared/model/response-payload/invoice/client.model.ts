export class ClientModel {
   private _email: string;
   private _logo: string;
   private _phonenumber: string;
   private _mf: string;
   private _rc: string;
   private _name: string;
   private _adresse: string;
   private _uuid: string;

  constructor( email: string,  logo: string, phonenumber: string, mf: string, rc: string,  name: string, adresse: string, uuid: string) {
    this._email = email;
    this._logo = logo;
    this._phonenumber = phonenumber;
    this._mf = mf;
    this._rc = rc;
    this._name = name;
    this._adresse = adresse;
    this._uuid = uuid;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get logo(): string {
    return this._logo;
  }

  set logo(value: string) {
    this._logo = value;
  }

  get phonenumber(): string {
    return this._phonenumber;
  }

  set phonenumber(value: string) {
    this._phonenumber = value;
  }

  get mf(): string {
    return this._mf;
  }

  set mf(value: string) {
    this._mf = value;
  }

  get rc(): string {
    return this._rc;
  }

  set rc(value: string) {
    this._rc = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }
}
