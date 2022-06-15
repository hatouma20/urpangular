export class Leavedaysinmonths {
  constructor(
    public month: { value: string, dirty: boolean, class: string, error: string },
    public days: { value: Array<string>, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
