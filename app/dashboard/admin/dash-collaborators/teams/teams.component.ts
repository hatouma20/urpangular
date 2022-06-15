import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TeamsService} from '../../../../shared/services/back-end/teams/teams.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {BehaviorSubject} from 'rxjs';
import {TeamModel} from '../../../../shared/model/response-payload/collaborators/teams/team';


export class TeamMembers {
  public members: Array<any>;
  constructor() {
    this.members = [];
  }
}


@Component({
  selector: 'wind-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['teams.component.css']
})
export class TeamsComponent implements OnInit {


  private getTeamsFinished = new BehaviorSubject(null);
  private getTeamsFinished2 = new BehaviorSubject(null);
  private getcollaboratorFinished = new BehaviorSubject(null);
  private getTeamFinished = new BehaviorSubject(null);
  private addteamfinished = new BehaviorSubject(null);
  private getteamfinished = new BehaviorSubject(null);
  private  getteamfinishedAffect = new BehaviorSubject(null);
  private getteamfinishedDesAffect = new BehaviorSubject(null);
  teammodel: TeamModel = new TeamModel(
    {value: null, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    {
     uuid: {value: '', dirty: false, class: '', error: ''},
    }
  );

  /*_________declaration________*/

  collaboratorResult: any;

  collaboratorsList: Array<any> = [];

  collaboratorList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  departments = {};
  collaborators: any = [];
  teamList: Array<any> = [];
  teamResult: any;
  collaboratorget: any = [];
  collaboratorgetdropdown: any = [];

  show: boolean = false;
  /*__________dropdown__________*/
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
  coll: any = [];
/*_____________Append______________*/


  /*_________constructor________*/
  constructor(private router: Router,
              private modalService: NgbModal,
              private  leaveService: LeavesService,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService,
              private teamsService: TeamsService,
             ) {}
  /*_________function________*/
  ngOnInit(): void {

    this.getall();
    let strfirstname = '';
    let strlastname = '';
    this.sirhService.getcollaboratornotaffected().subscribe(response => {
      response.forEach(elt => {
        strfirstname = elt.firstname.charAt(0);
        strlastname = elt.lastname.charAt(0);
         this.collaborators.push({ item_id: elt.uuid, item_firstname: elt.firstname, item_lastname: elt.lastname, item_FNC: strfirstname, item_LNC: strlastname , item_picture: elt.personalPicture });
      /*________dropdown__________*/
        const coll =  [];
        response.forEach(elt2 => {
          coll.push({ item_id: elt2.uuid, item_text: elt2.firstname });
        });
        this.collaboratorList.next(coll);
        this.ref.detectChanges();

      });
      this.collaboratorsList = response;
      this.ref.detectChanges();
     });
  }

  getall() {
    this.getTeamsFinished.next(false);
    this.teamsService.getAllTeam().subscribe(response => {
      this.teamList = response;
      for (let i = 0; i < this.teamList.length; i++) {
        this.departments[i] = new TeamMembers();
      }
      this.ref.detectChanges();
      this.getTeamsFinished.next(true);
    }
    );
    this.getTeamsFinished.subscribe(value => {
   if (value === true) {
     for (let i = 0; i < this.teamList.length; i++) {
       this.sirhService.getCollaboratorInTeam(this.teamList[i].uuid).subscribe(responsee => {
         responsee.forEach(elt => {
           this.departments[i].members.push({ item_id: elt.uuid, item_firstname: elt.firstname, item_lastname: elt.lastname, item_FNC: elt.firstname.charAt(0), item_LNC: elt.lastname.charAt(0) , item_picture: elt.personalPicture });
           /*________dropdown__________*/
           const coll =  [];
           responsee.forEach(elt2 => {
             coll.push({ item_id: elt2.uuid, item_text: elt2.firstname });
           });
           this.ref.detectChanges();
         });

       });
     }
   }
   }
 );
  }
  /*_________DragDrop________*/
  drop(event: CdkDragDrop<any[]>,  departementid: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    /*#region affect collaborator >>> departement*/

    this.getcollaboratorFinished.next(false);
    this.getTeamFinished.next(false);

    if (departementid != null) {
      this.affectcollaborator(event.container.data[event.currentIndex].item_id, departementid);
    } else {
      this.desafectcollaborator(event.container.data[event.currentIndex].item_id);
    }

    /*#Endregion affect collaborator >>> departement*/
  }

  affectcollaborator(uuidcollaborator: any, departementid: any) {
    this.getteamfinishedAffect.next(false);
    let strfirstname = '';
    let strlastname = '';

    this.sirhService.AffectCollaboratorTeam(uuidcollaborator, departementid).subscribe(response =>
          // window.location.reload()
          this.getteamfinishedAffect.next(true)
        );

    this.getteamfinishedAffect.subscribe(value => {
      if (value) {

        this.sirhService.getcollaboratornotaffected().subscribe(response => {
          this.collaborators = [];
          this.collaboratorList = new BehaviorSubject<Array<any>>([]);
          response.forEach(elt => {
            strfirstname = elt.firstname.charAt(0);
            strlastname = elt.lastname.charAt(0);
            this.collaborators.push({
              item_id: elt.uuid,
              item_firstname: elt.firstname,
              item_lastname: elt.lastname,
              item_FNC: strfirstname,
              item_LNC: strlastname,
              item_picture: elt.personalPicture
            });
            /*________dropdown__________*/
            const coll2 = [];
            response.forEach(elt2 => {
              coll2.push({item_id: elt2.uuid, item_text: elt2.firstname});
            });
            this.collaboratorList.next(coll2);
            this.ref.detectChanges();

          });
          this.collaboratorsList = response;
          this.ref.detectChanges();
        });
      } });
  }
  desafectcollaborator(uuidcollaborator: any) {
    this.getteamfinishedDesAffect.next(false);
    let strfirstname = '';
    let strlastname = '';
    this.sirhService.DesaffectCollaboratorTeam(uuidcollaborator).subscribe(response =>
      // window.location.reload()
      this.getteamfinishedDesAffect.next(true)
    );
    this.getteamfinishedDesAffect.subscribe(value => {
      if (value) {

        this.sirhService.getcollaboratornotaffected().subscribe(response => {
          this.collaborators = [];
          this.collaboratorList = new BehaviorSubject<Array<any>>([]);
          response.forEach(elt => {
            strfirstname = elt.firstname.charAt(0);
            strlastname = elt.lastname.charAt(0);
            this.collaborators.push({
              item_id: elt.uuid,
              item_firstname: elt.firstname,
              item_lastname: elt.lastname,
              item_FNC: strfirstname,
              item_LNC: strlastname,
              item_picture: elt.personalPicture
            });
            /*________dropdown__________*/
            const coll2 = [];
            response.forEach(elt2 => {
              coll2.push({item_id: elt2.uuid, item_text: elt2.firstname});
            });
            this.collaboratorList.next(coll2);
            this.ref.detectChanges();

          });
          this.collaboratorsList = response;
          this.ref.detectChanges();
        });
      } });

    }

    hideTeam(divid: any) {
    let element: HTMLElement = document.getElementById(divid);
    element.setAttribute('style', 'display:none');
  }

  /*___________Drop down function_____________*/
  onItemSelect(item: any) {
    const a = this.coll.list;
    this.ListCollaboratorsSelected =  item.item_id;
    console.log('onItemSelect', item);


  }
  onItemDeSelect(item: any) {
    this.ListCollaboratorsSelected.forEach((elt, index) => {
      if (elt.uuid === item.item_id) {
        this.ListCollaboratorsSelected.splice(index, 1); }
    })
    console.log('onItemSelect', item);

  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {closeDropDownOnSelection: this.closeDropdownSelection});
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toggle() {
    this.show = !this.show;
  }

  onFormSubmit() {
    this.submitForm();
  }

  private submitForm() {

    let strfirstname = '';
    let strlastname = '';


    this.addteamfinished.next(false);
    this.getteamfinished.next(false);
   //add new teams
    this.teamsService
      .createTeam(  {
        label: this.teammodel.label.value,
        description: this.teammodel.description.value,
        manager_team:
          {
            uuid:   this.ListCollaboratorsSelected ,
          },
       } ).subscribe(response2 => {
         this.teamList.unshift(response2);
         for (let i = 0; i < this.teamList.length; i++) {
                this.departments[i] = new TeamMembers();
         }
         this.addteamfinished.next(true);

         this.ref.detectChanges();
         this.show = !this.show;
         this.teammodel.label.value = '';
    });
//get team and collaborator in team
    this.addteamfinished.subscribe(valueadd => {
       if (valueadd) {
                for (let i = 0; i < this.teamList.length; i++) {

                 this.sirhService.getCollaboratorInTeam(this.teamList[i].uuid).subscribe(responsee => {
                   this.departments[i].members = [];
                   responsee.forEach(elt => {

                   this.departments[i].members.push({ item_id: elt.uuid, item_firstname: elt.firstname, item_lastname: elt.lastname, item_FNC: elt.firstname.charAt(0), item_LNC: elt.lastname.charAt(0) , item_picture: elt.personalPicture });
                   });

                 });
                }
                this.getteamfinished.next(true);
       }});
//get collaborator not affected
    this.getteamfinished.subscribe(value => {
      if (value) {

        this.sirhService.getcollaboratornotaffected().subscribe(response => {
          this.collaborators = [];
          this.collaboratorList = new BehaviorSubject<Array<any>>([]);
          response.forEach(elt => {
            strfirstname = elt.firstname.charAt(0);
            strlastname = elt.lastname.charAt(0);
            this.collaborators.push({ item_id: elt.uuid, item_firstname: elt.firstname, item_lastname: elt.lastname, item_FNC: strfirstname, item_LNC: strlastname , item_picture: elt.personalPicture });
            /*________dropdown__________*/
            const coll2 =  [];
            response.forEach(elt2 => {
              coll2.push({ item_id: elt2.uuid, item_text: elt2.firstname });
            });
            this.collaboratorList.next(coll2);
            this.ref.detectChanges();

          });
          this.collaboratorsList = response;
          this.ref.detectChanges();
        });



         }});




  }
}
