import {Leave} from './leave';

export class Companyleaverule {
  constructor(
    public isdefault: { value: boolean, dirty: boolean, class: string, error: string },
    public name: { value: string, dirty: boolean, class: string, error: string },
    public leave: { value: Leave, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public value: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
