import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({

  selector: 'wind-Societe',
  templateUrl: './societe.component.html',
  styleUrls: ['societe.component.css'],

})

export class SocieteComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

}
