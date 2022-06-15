import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {WindForm, WindFormElement} from '../../shared/model/windForm';
import {EventManagerService} from '../../shared/services/event/event-manager.service';
import {RegisterModel} from '../../shared/model/response-payload/auth/register';
import {EventWithContent} from '../../shared/services/event/event-with-content';
import {REGISTER_ATTEMPTED, REGISTER_FAIL, REGISTER_SUCCESS} from '../../shared/constants/event';
import { Router } from '@angular/router';

@Component({
  selector: 'wind-wind-auth-register',
  templateUrl: './wind-auth-register.component.html',
  styleUrls: ['./wind-auth-register.component.scss']
})
export class WindAuthRegisterComponent implements OnInit {

  RegisterError = false;
  RegisterSuccess = false;
  rcPattern = new RegExp("^[0-9]{8}$");
  mfPattern = new RegExp("^[0-9a-z]{11}$");

  register: RegisterModel = new RegisterModel(
    {value: '', class: '', dirty: false, error: ''},
    {value: '', class: '', dirty: false, error: ''},
    {value: '', class: '', dirty: false, error: ''},
    true
  )
  constructor(private eventManager: EventManagerService, private router: Router) {
  }

  ngOnInit(): void {
    this.eventManager.on(REGISTER_SUCCESS, () => {
      // afficher message de succeé
      this.RegisterSuccess = true;
      this.RegisterError = false;
      this.router.navigateByUrl('/auth/confirmregister');
    });
    this.eventManager.on(REGISTER_FAIL, () => {
      // afficher message erreur
      this.RegisterError = true;
      this.RegisterSuccess = false;
    });
  }

  onFormSubmit() {
     this.validateRequiredInputForm();
    const payload = {
      email: this.register.email.value,
      patent: this.register.patent.value,
      "trade_register": this.register.trade_register.value
    };
    this.eventManager.broadcast(new EventWithContent(REGISTER_ATTEMPTED, payload));
  }

  authRegister() {
    const email = this.register.email.value;
    // this.authService.resetPassword(email).subscribe(response => {
    // });
  }

  private validateRequiredInputForm() {
    if (this.register.email.value === '') {
      this.register.email.dirty = true;
      this.register.email.class = 'invalid';
      this.register.email.error = 'should not be empty';
    } else {
      this.register.email.dirty = false;
      this.register.email.class = 'valid';
      this.register.email.error = '';
    }
    if (this.register.patent.value === '') {
      this.register.patent.dirty = true;
      this.register.patent.class = 'invalid';
      this.register.patent.error = 'should not be empty';
    } else {
      this.register.patent.dirty = false;
      this.register.patent.class = 'valid';
      this.register.patent.error = '';
    }
    if (this.register.trade_register.value === '') {
      this.register.trade_register.dirty = true;
      this.register.trade_register.class = 'invalid';
      this.register.trade_register.error = 'should not be empty';
    } else {
      this.register.trade_register.dirty = false;
      this.register.trade_register.class = 'valid';
      this.register.trade_register.error = '';
    }

  }

  private FormIsValid() {
    for (const element in this.register) {
      if (this.register[element].dirty) {
        this.register.isValid = false;
        break;
      } else {
        this.register.isValid = true;
        const shadesEl2 = document.querySelector('.alert-danger');
        shadesEl2.classList.remove('show');
      }
    }
    return this.register.isValid;
  }





}
