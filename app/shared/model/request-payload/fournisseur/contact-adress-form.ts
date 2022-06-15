export class ContactAdresseRequestForm {
  constructor(
               public tiers: { values: { uuid: string}, dirty: boolean, class: string, error: string },
               public name: { value: string, dirty: boolean, class: string, error: string },
               public firstname: { value: string, dirty: boolean, class: string, error: string },
               public civility: { value: string, dirty: boolean, class: string, error: string },
               public ownerfunction: { value: string, dirty: boolean, class: string, error: string },
               public address: { value: string, dirty: boolean, class: string, error: string },
               public zipCode: { value: string, dirty: boolean, class: string, error: string },
               public city: { value: string, dirty: boolean, class: string, error: string },
               public department: { value: string, dirty: boolean, class: string, error: string },
               public profPhone: { value: string, dirty: boolean, class: string, error: string },
               public mobile: { value: string, dirty: boolean, class: string, error: string },
               public fax: { value: string, dirty: boolean, class: string, error: string },
               public email: { value: string, dirty: boolean, class: string, error: string },
               public isdefault: { value: boolean, dirty: boolean, class: string, error: string },
               public isValid: boolean) {
  }
}

