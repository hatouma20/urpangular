export class FournisseurResult {
  constructor( public rc: string,
               public uuid: string,
               public country: string,
               public name: string,
               public alternativeName: string,
               public nature: string,
               public code: string,
               public state: string,
               public address: string,
               public zipCode: string,
               public city: string,
               public phone: string,
               public fax: string,
               public email: string,
               public web: string,
               public taxRegistration: string,
               public endouaneCode: string,
               public ban: string,
               public tvaLiable: boolean,
               public tvaNumber: string,
               public tiersType: string,
               public employee: string,
               public typeLegEnt: string,
               public visibility: boolean,
               public isValid: boolean) {
  }
}

