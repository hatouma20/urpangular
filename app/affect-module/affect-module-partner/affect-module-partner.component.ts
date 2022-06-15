import {Component, OnInit} from '@angular/core';
import {element} from 'protractor';
import {BehaviorSubject} from 'rxjs';
import {CollaboratorBankAccount} from '../../shared/model/response-payload/collaborators/collaborator-Bank-Account';
import {ModuleModel} from '../../shared/model/response-payload/module/module.mode';
import {SubModuleModel} from '../../shared/model/response-payload/module/submodule.model';
import {ModuleService} from '../../shared/services/back-end/module/module-service';
import {PartnerService} from '../../shared/services/back-end/partner/partner.service';

@Component({
  selector: 'affect-module-partner',
  templateUrl: './affect-module-partner.component.html',
  styleUrls: ['./affect-module-partner.component.css']
})
export class AffectModulePartnerComponent implements OnInit {
  selectedmodules = [];
  // selectedmodules: [{
  //   name: '',
  //   service_id: '',
  //   sub_modules: [],
  //   uuid: '',
  // }];
  modules = [];
  firstmodules = [];
  secondmodules = [];
  private finished = new BehaviorSubject(null);
  constructor(private module_servise: ModuleService,
              private _partnerService: PartnerService) {
  }
  ngOnInit(): void {
    this.finished.next(false);
    this.module_servise. getAllModules().subscribe(response => {
      response.forEach(elt => {
        this.selectedmodules.push({
          name: elt.name,
          checked: false,
          service_id: elt.service_id,
          sub_modules: elt.sub_modules,
          uuid: elt.uuid
        });
      });
      this.selectedmodules.push({
          name: 'Contabilité',
          checked: false,
          service_id: 'wind-Contabilité',
          sub_modules: []
        },
        {
          name: 'Finance',
          checked: false,
          service_id: 'wind-Finance',
          sub_modules: []
        },
        {
          name: 'Test',
          checked: false,
          service_id: 'wind-Test',
          sub_modules: []
        },
        {
          name: 'Contabilité',
          checked: false,
          service_id: 'wind-Contabilité',
          sub_modules: []
        },
        {
          name: 'Finance',
          checked: false,
          service_id: 'wind-Finance',
          sub_modules: []
        },
        {
          name: 'Test',
          checked: false,
          service_id: 'wind-Test',
          sub_modules: []
        })
      this.finished.next(true);
    });
    this.finished.subscribe(value => {
    if (value) {
      this.selectedmodules.forEach((elt, index) => {
        if (index <= 11) {
          this.firstmodules.push(elt);
        } else if (index > 11) {
          this.secondmodules.push(elt);
        }
      });
    }
  });
  }

  onFormSubmit() {
    const currentModule = [];
    this.selectedmodules.forEach(elt => {
     if (elt.checked) {
       currentModule.push(elt.uuid);
     }
   });
    if (currentModule.length > 0) {
      this._partnerService.affectModuletoPartner(currentModule).subscribe(resp => {
      const shadesEl = document.querySelector('.alert-success');
      shadesEl.classList.add('show');
    });}
  }

  checkmodulefirstList(id) {
    this.selectedmodules[id].checked = !this.selectedmodules[id].checked;
  }
}
