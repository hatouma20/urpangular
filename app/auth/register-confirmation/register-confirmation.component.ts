import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {WindForm, WindFormElement} from '../../shared/model/windForm';
import {EventManagerService} from '../../shared/services/event/event-manager.service';
import {RegisterModel} from '../../shared/model/response-payload/auth/register';
import {EventWithContent} from '../../shared/services/event/event-with-content';
import {REGISTER_ATTEMPTED, REGISTER_FAIL, REGISTER_SUCCESS} from '../../shared/constants/event';
import { Router } from '@angular/router';

@Component({
  selector: 'register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class RegisterConfirmationComponent implements OnInit {



  constructor() {
  }

  ngOnInit(): void {

  }






}
