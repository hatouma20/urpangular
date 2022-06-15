import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';

@Component({
  selector: 'wind-coordonnee',
  templateUrl: './coordonnees.component.html',
  styleUrls: ['./coordonnees.component.css']
})
export class CoordonneesComponent implements OnInit {
  editField: string;
  personList: Array<any>;
  // @ts-ignore
  awaitingPersonList: Array<any> = Array.from(Array(1000).keys({
    id: 1,
    typecontrat: '',
    datedebut: '',
    datefin: '',
    datefinPE: '',
    datesortie: ''
  }));
  collaboratorResult: any;

  constructor(private logger: NGXLogger,
              private collaboratorSearchService: CollaboratorService) {
  }

  ngOnInit(): void {
    this.collaboratorResult = this.collaboratorSearchService.collaboratorResult;
    this.personList = [
      {
        id: 1,
        adresse: this.collaboratorResult.address + ' ' + this.collaboratorResult.city + ' ' + this.collaboratorResult.country,
        tel: this.collaboratorResult.phoneNumber,
        email: this.collaboratorResult.personalEmail,
        contact: ' '
      }
    ];
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
