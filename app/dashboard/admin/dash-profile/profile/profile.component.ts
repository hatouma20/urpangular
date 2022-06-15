import {Component, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dash-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../dash-main/dash-main.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
  url: string | ArrayBuffer = '';

  constructor() {
  }
  ngOnInit(): void {
  }

  onFormSubmit() {
  }
}
