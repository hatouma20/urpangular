import {Component, OnInit} from '@angular/core';
import {ResetModel} from '../../shared/model/response-payload/auth/reset-model';
import {AuthService} from '../../shared/services/back-end/auth/auth.service';

@Component({
  selector: 'wind-wind-auth-password-reset',
  templateUrl: './wind-auth-password-reset.component.html',
  styleUrls: ['./wind-auth-password-reset.component.scss']
})
export class WindAuthPasswordResetComponent implements OnInit {

  resetpassword: ResetModel = new ResetModel(
    {value: '', class: '', dirty: false, error: ''},
    {value: '', class: '', dirty: false, error: ''},
    {value: '', class: '', dirty: false, error: ''},
    true
  )
  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }


  onFormSubmit() {
    this.validateRequiredInputForm();
    if (!this.FormIsValid()) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.add('show');
      return;
    } else {
      this.reset();
    }
  }

  reset() {
    const email = this.resetpassword.email.value;
    // this.authService.resetPassword(email).subscribe(response => {
    // });
  }

  private validateRequiredInputForm() {
    if (this.resetpassword.email.value === '') {
      this.resetpassword.email.dirty = true;
      this.resetpassword.email.class = 'invalid';
      this.resetpassword.email.error = 'Email should not be empty';
    } else {
      this.resetpassword.email.dirty = false;
      this.resetpassword.email.class = 'valid';
      this.resetpassword.email.error = '';
    }}

    private FormIsValid() {
    for (const element in this.resetpassword) {
      if (this.resetpassword[element].dirty) {
        this.resetpassword.isValid = false;
        break;
      } else {
        this.resetpassword.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.resetpassword.isValid;
  }

}
