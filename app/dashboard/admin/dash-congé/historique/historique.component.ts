import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {element} from 'protractor';
import {BehaviorSubject, from} from 'rxjs';
import {delay, map, switchMap, tap} from 'rxjs/operators';
import {CollaboratorLeave} from '../../../../shared/model/response-payload/collaborators/congé/collaborator-leave';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-historique-leave',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
  styles: [
    `
      ::ng-deep .multiselect-dropdown .dropdown-btn .selected-item a {
        display: none !important;
      }
      ::ng-deep.item1 .multiselect-item-checkbox{
        display: none !important;
      }
  `
  ]
})
export class HistoriqueLeaveComponent implements OnInit {
  coll: any = [];
  collaboratorselected: CollaboratorLeave = new CollaboratorLeave(
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: [], dirty: false, class: '', error: ''},
    {value: [], dirty: false, class: '', error: ''},
    true
  );
  congeList: any = [];
  arrayofCollaborator = [];
  ListCollaboratorsSelected = [];
  private getAllLeaveByCollaboratorFinished = new BehaviorSubject(null);
  private getAllLeaveByCollaboratorFinishedOnSearch = new BehaviorSubject(null);
  myForm: FormGroup;
  disabled = false;
  limitSelection = false;
  collaboratorList = new BehaviorSubject<Array<any>>([]);
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  public data: Array<{ text: string, value: number }>;
  constructor(private router: Router,
              private modalService: NgbModal,
              private  leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
      this.getAllLeaveByCollaboratorFinished.next(false);
      this.leaveService.getAllLeaveByCollaborator().subscribe(response => {
      const list = response;
      list.forEach((elt, index) => {
        this.congeList.push(
          {
            collaborator: elt.collaborator,
            collaboratorname: '',
            current_payed_leave_credit: elt.current_payed_leave_credit,
            current_sick_leave_credit: elt.current_sick_leave_credit,
            rules: elt.rules,
          }
        );
        this.arrayofCollaborator.push(
          { item_id: elt.collaborator, item_text: '' },
        );
      });
      this.getAllLeaveByCollaboratorFinished.next(true);
    });
      this.getAllLeaveByCollaboratorFinished.subscribe(value => {
      if (value) {
        let i = 0;
        this.congeList.forEach((elt, index) => {
          this.sirhService.getCollaborator(elt.collaborator).subscribe(response => {
            this.congeList.find(conge => conge.collaborator === response.uuid);
            this.congeList[index].collaboratorname = response.firstname + ' ' + response.lastname;
            this.arrayofCollaborator[index].item_text = response.firstname + ' ' + response.lastname;
            i++;
            if (i === this.congeList.length) {
            this.collaboratorList.next(this.arrayofCollaborator);
            }
          });
          this.ref.detectChanges();
        });
      }
    });
      this.myForm = this.fb.group({
    });


  }
  onselectCollaborator(collaborator: any) {
    this.router.navigateByUrl(`/dashboard/admin/conge/historiqueByCollabrator/${collaborator.collaborator}`);
    this.leaveService.collaboratorSelected = collaborator;
  }



  search() {
    this.getAllLeaveByCollaboratorFinishedOnSearch.next(false);
    this.congeList = [];
    this.ListCollaboratorsSelected.forEach( collaborator => {
    this.leaveService.getLeaveByCollaborator(collaborator.uuid).subscribe(response => {
      this.congeList.push(
            {
              collaborator: response.collaborator,
              collaboratorname: '',
              current_payed_leave_credit: response.current_payed_leave_credit,
              current_sick_leave_credit: response.current_sick_leave_credit,
              rules: response.rules,
            }
          );
      this.getAllLeaveByCollaboratorFinishedOnSearch.next(true);
      });
    this.getAllLeaveByCollaboratorFinishedOnSearch.subscribe(value => {
        if (value) {
          this.congeList.forEach((elt, index) => {
            this.sirhService.getCollaborator(elt.collaborator).subscribe(response => {
              this.congeList.find(conge => conge.collaborator === response.uuid);
              this.congeList[index].collaboratorname = response.firstname + ' ' + response.lastname;
            });
            this.ref.detectChanges();
          });
        }
      });
    });
  }
    onItemSelect(item: any) {
    const a = this.coll.list;
    this.ListCollaboratorsSelected.push({
      uuid: item.item_id,
      name: item.item_text
    })
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    this.ListCollaboratorsSelected.forEach((elt, index) => {
      if (elt.uuid === item.item_id) {
        this.ListCollaboratorsSelected.splice(index, 1); }
    })
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
}
