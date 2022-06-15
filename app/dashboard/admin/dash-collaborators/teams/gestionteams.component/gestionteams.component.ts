import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject} from 'rxjs';
import {TeamModel} from '../../../../../shared/model/response-payload/collaborators/teams/team';
import {CollaboratorService} from '../../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../../shared/services/back-end/leaves/leaves-service';
import {TeamsService} from '../../../../../shared/services/back-end/teams/teams.service';
import {TeamMembers} from '../teams.component';


@Component({
  selector: 'wind-gestionteams',
  templateUrl: './gestionteams.component.html',
  styleUrls: ['gestionteams.component.css'],
  styles: [
    `
      ::ng-deep .multiselect-dropdown .dropdown-btn .selected-item a {
        display: none !important;
      }
      ::ng-deep.item1 .multiselect-item-checkbox{
        display: none !important;
      }
      ::ng-deep.item2{
          max-height: 130px !important;
      }
  `
  ]

})
export class GestionteamsComponent implements OnInit {
  private getteamfinished = new BehaviorSubject(null);
tablemanagertetails: string;
  teammodel: TeamModel = new TeamModel(
    {value: null, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {
      uuid: {value: '', dirty: false, class: '', error: ''},
    }
  );

  private updateteamchefFinished = new BehaviorSubject(null);
  private deleteteamchefFinished = new BehaviorSubject(null);
  tableteamsList: Array<any> = [];
  teamList: Array<any> = [];
  editField: string;
  selecteditem: any;
  show: boolean = true;
  /*_________declaration________*/
  collaboratorsList: Array<any> = [];
  collaboratorList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private getAllLeaveByCollaboratorFinished = new BehaviorSubject(null);
  private getAllLeaveByCollaboratorFinishedOnSearch = new BehaviorSubject(null);
  coll: any = [];
  closeDropdownSelection = true;
  dropdownSettings: any = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    closeDropDownOnSelection: this.closeDropdownSelection
  };

  ListCollaboratorsSelected: any;
  collaboratorResult: any;
  /*_________constructor________*/
  constructor(private router: Router,
              private modalService: NgbModal,
              private  leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService,
              private teamsService: TeamsService,
              private fb: FormBuilder)  {}
  /*_________function________*/
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      columnDefs: [
        { type: 'date', targets: 0} ],
    };


    this.sirhService.getcollaboratornotaffected().subscribe(response => {
      const coll =  [];
      response.forEach(elt => {
        const collaboirator = elt.firstname + ' ' + elt.lastname;
        coll.push({ item_id: elt.uuid, item_text: collaboirator  });
      });
      this.collaboratorList.next(coll);
      this.ref.detectChanges();

       /*-----------------___________Tableau_____________---------------*/

      this.sirhService.getcollaboratornotaffected().subscribe(responsee => {
        this.collaboratorsList = responsee;
        this.ref.detectChanges();

      });

      this.getall();

    });
  }
  toggle() {
    this.show = !this.show;
  }

  getall() {
    this.teamsService.getAllTeam().subscribe(response => {
      this.teamList = response;
      this.ref.detectChanges();
      this.dtTrigger.next();
    });
    this.ref.detectChanges();

}

  onItemSelect(item: any) {
    this.selecteditem = item;
    const a = this.coll.list;
    this.ListCollaboratorsSelected =  item.item_id;
    this.tablemanagertetails = item.item_text;
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    this.ListCollaboratorsSelected.forEach((elt, index) => {
      if (elt.uuid === item.item_id) {
        this.ListCollaboratorsSelected.splice(index, 1);
      }
    })
    console.log('onItemSelect', item);
  }

  public onDeSelect(item: any) {
    console.log(item);
  }

  onDeSelectAll(items: any) {
    console.log(items); // items is an empty array
  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {closeDropDownOnSelection: this.closeDropdownSelection});
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }


  onFormSubmit() {
    this.submitForm();
  }

  private submitForm() {
    this.getteamfinished.next(false);
    this.teamsService
      .createTeam(  {
        label: this.teammodel.label.value,
        description: this.teammodel.description.value,
        manager_team:
          {
            uuid:   this.ListCollaboratorsSelected ,
          },
      } ).subscribe(response => {

      this.show = !this.show;
      this.teamList.push(response);
      this.teammodel.label.value = '';
      this.teammodel.description.value = '';

     // alert(document.getElementsByClassName('selected-item'));
      this.getteamfinished.next(true);

    });

    // get collaborator not affected
    this.getteamfinished.subscribe(value => {
      if (value) {

        this.sirhService.getcollaboratornotaffected().subscribe(response => {
          const coll = [];
          response.forEach(elt => {
            const collaboirator = elt.firstname + ' ' + elt.lastname;
            coll.push({item_id: elt.uuid, item_text: collaboirator});
          });
          this.collaboratorList.next(coll);
          this.ref.detectChanges();

          /*-----------------___________Tableau_____________---------------*/

          this.sirhService.getcollaboratornotaffected().subscribe(responsee => {
            this.collaboratorsList = responsee;
            this.ref.detectChanges();


          });
        });
      }
    });
  }


  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.teamList[id][property] = editField;
    const currentTeam = this.teamList[id];
    this.teamsService.update(currentTeam).subscribe(response =>
      // window.location.reload()
      console.log(response)
    );
  }

  remove(uuid: any, id: any) {
    this.deleteteamchefFinished.next(false);
    this.teamsService.delete(uuid.uuid).subscribe(response => {

      this.teamList.splice(id, 1);
      this.deleteteamchefFinished.next(true);
    });
    this.modalService.dismissAll();

    this.deleteteamchefFinished.subscribe(value => {
      if (value) {
        this.sirhService.getcollaboratornotaffected().subscribe(response => {
          const coll =  [];
          response.forEach(elt => {
            const collaboirator = elt.firstname + ' ' + elt.lastname;
            coll.push({ item_id: elt.uuid, item_text: collaboirator  });
          });
          this.collaboratorList.next(coll);
          this.sirhService.getcollaboratornotaffected().subscribe(responsee => {
            this.collaboratorsList = responsee;
            this.ref.detectChanges();

          });

          // this.getall();

        });
      }});
  }
  editeamchef(teamid: any, id: any) {
    this.updateteamchefFinished.next(false);
    this.modalService.dismissAll();
    const x = (document.getElementById('myTable') as HTMLTableElement).rows[id + 1].cells;
    this.teamsService.updateManagerTeam(this.ListCollaboratorsSelected, teamid.uuid).subscribe(response => {
      x[3].innerText = this.tablemanagertetails;
      this.updateteamchefFinished.next(true);
    });

    this.updateteamchefFinished.subscribe(value => {
      if (value) {
    this.sirhService.getcollaboratornotaffected().subscribe(response => {
      const coll =  [];
      response.forEach(elt => {
        const collaboirator = elt.firstname + ' ' + elt.lastname;
        coll.push({ item_id: elt.uuid, item_text: collaboirator  });
      });
      this.collaboratorList.next(coll);
      this.sirhService.getcollaboratornotaffected().subscribe(responsee => {
        this.collaboratorsList = responsee;
        this.ref.detectChanges();

      });

      // this.getall();

    });
      }});
  }

  open(content) {
    this.modalService.open(content);
  }
}
