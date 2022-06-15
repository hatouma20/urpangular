
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {TeamsService} from '../../../../shared/services/back-end/teams/teams.service';

@Component({
  selector: 'wind-payroll-setting',
  templateUrl: './payroll-setting.component.html',
  styleUrls: ['payroll-setting.component.css', '../../../../../assets/css/mystyle.css']
})
export class PayrollSettingComponent implements OnInit {

  /*_____---_____---_____---_____---____CONSTRUCTOR____---_____---____---_____---_____*/
  constructor(
              private router: Router,
              private modalService: NgbModal,
              private leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }


}
