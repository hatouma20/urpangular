  export class FournisseurRequestForm {
  constructor( public name: { value: string, dirty: boolean, class: string, error: string },
               public alternativeName: { value: string, dirty: boolean, class: string, error: string },
               public nature: { value: string, dirty: boolean, class: string, error: string },
               public code: { value: string, dirty: boolean, class: string, error: string },
               public state: { value: string, dirty: boolean, class: string, error: string },
               public rc: { value: string, dirty: boolean, class: string, error: string },
               public taxRegistration: { value: string, dirty: boolean, class: string, error: string },
               public tvaLiable: { value: boolean, dirty: boolean, class: string, error: string },
               public tvaNumber: { value: string, dirty: boolean, class: string, error: string },
               public datedebut: { value: Date, dirty: boolean, class: string, error: string },
               public datefin: { value: Date, dirty: boolean, class: string, error: string },
               public tiersType: { value: string, dirty: boolean, class: string, error: string },
               public employee: { value: string, dirty: boolean, class: string, error: string },
               public typeLegEnt: { value: string, dirty: boolean, class: string, error: string },
               public capital: { value: number, dirty: boolean, class: string, error: string },
               public country: { value: string, dirty: boolean, class: string, error: string },
               public email: { value: string, dirty: boolean, class: string, error: string },
               public fax: { value: string, dirty: boolean, class: string, error: string },
               public tel: { value: string, dirty: boolean, class: string, error: string },
               public web: { value: string, dirty: boolean, class: string, error: string },
               public isValid: boolean
  ) {
  }
 }
