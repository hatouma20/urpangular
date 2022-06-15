import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AUTHENTICATION_FAIL, LOGIN_ATTEMPTED, ROLE_ADMIN} from '../../shared/constants/event';
import {AUTHENTICATION_KEY} from '../../shared/constants/local-storage-keys';
import {WindForm, WindFormElement} from '../../shared/model/windForm';
import {AuthService} from '../../shared/services/back-end/auth/auth.service';
import {CollaboratorService} from '../../shared/services/back-end/collaborator/collaborator.service';
import {EventManagerService} from '../../shared/services/event/event-manager.service';
import {LocalStorageService} from '../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'wind-auth-login',
  templateUrl: './wind-auth-login.component.html',
  styleUrls: ['./wind-auth-login.component.scss']
})
export class WindAuthLoginComponent implements OnInit {

  form: WindForm = new WindForm([
    new WindFormElement('login', '', 'text', [Validators.required, Validators.min(4)], 'Nom d\'utilisateur ou Email'),
    new WindFormElement('password', '', 'password', [Validators.required, Validators.min(4)], 'Mot de passe'),
  ]);
  submitting = false;
  authenticationError = false;
  authError: string;
  theCheckbox = false;
  loginrequired = false;
  passwordrequired = false;
errorcnx = false;
  constructor(private eventManager: EventManagerService,
              private authService: AuthService,
              private sirhService: CollaboratorService,
              private router: Router,
              private localSt: LocalStorageService) {
  }

  ngOnInit(): void {
    this.eventManager.on(AUTHENTICATION_FAIL, _ => this.submitting = false);

  }

  public login() {
    if ((this.form.getField('login').asFormControl.value === '') || (this.form.getField('login').asFormControl.value === null)) {
      this.loginrequired = true;
      this.errorcnx = false;
    } else {
      this.loginrequired = false;
      this.errorcnx = false;
    }
    if ((this.form.getField('password').asFormControl.value === '') || (this.form.getField('password').asFormControl.value === null)) {
      this.passwordrequired = true;
      this.errorcnx = false;
    } else {
      this.passwordrequired = false;
      this.errorcnx = false;
    }
    if ((this.loginrequired === false) && (this.passwordrequired === false)) {

    this.submitting = true
    this.authService
      .authenticate({
        username: this.form.getField('login').asFormControl.value,
        password: this.form.getField('password').asFormControl.value,
      }).subscribe(response => {
      // tslint:disable-next-line:no-unused-expression
      const role = response.role;
      this.authService.role = role;
      this.authService.connectedUser = response;
      if (role === 'ROLE_ADMIN') {
        this.router.navigateByUrl('/dashboard/admin/profile');
      }
      if (role === 'ROLE_USER') {
          this.router.navigateByUrl('/dashboard/employee/profile');
      }
      // tslint:disable-next-line:no-unused-expression
      this.errorcnx = false;
    }, error => {
      this.errorcnx = true;
      this.showAuthError();
    });
  }
  }

  showAuthError() {
    this.authenticationError = true;
    this.authError = 'Une erreur est survenue! Contactez votre administrateur';
  }


  toggleVisibility(e) {
    console.log('fffffffffffffffffff   '+e.target.checked);
    this.sirhService.rememberme = e.target.checked;

  }
}


