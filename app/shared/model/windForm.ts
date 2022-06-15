import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export class WindFormElement {
  private formControls$: FormControl;

  constructor(public name: string, public defaultValue: any, public type: any, public validations?: Array<ValidatorFn>, public placeholder: string = '',){
    this.formControls$ = new FormControl(this.defaultValue != '' ? this.defaultValue : null, this.validations);
  }

  get asFormControl(): FormControl {
    return this.formControls$;
  }

  get inputValidationClass(): 'is-valid' | 'is-invalid' {
    if (this.asFormControl.touched) {
      return this.asFormControl.valid ? 'is-valid' : 'is-invalid';
    }
  }
}

export class WindForm {

  public failedSubmissions: number = 0;
  private formGroup$;

  constructor(public fields: Array<WindFormElement>) {
    this.formGroup$ = new FormGroup({});
    this.fields.forEach(field => {
      this.formGroup$.addControl(field.name, new FormControl(field.validations));
    });
  }

  get asFormGroup(): FormGroup {
    return this.formGroup$;
  }

  get asJson(): {} {
    let json = {};
    this.fields.forEach(field => json[field.name] = field.asFormControl.value);
    return json;
  }

  getFieldControl(fieldName: string): FormControl {
    return this.fields.find(field => field.name === fieldName).asFormControl;
  }

  public getField(fieldName: string): WindFormElement {
    return this.fields.find(field => field.name === fieldName);
  }

  getGroupValidationClass(fieldName: string): 'has-success' | 'has-danger' {
    if (this.getField(fieldName).asFormControl.touched) {
      if (this.failedSubmissions > 0) {
        return 'has-danger';
      } else {
        return this.getField(fieldName).asFormControl.valid ? 'has-success' : 'has-danger';
      }
    }
  }
}
