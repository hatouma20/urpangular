import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'wind-infocontrat',
  templateUrl: './info-contrat.component.html',
  styleUrls: ['info-contrat.component.css']
})
export class InfoContratComponent implements OnInit {
  editField: string;
  personList: Array<any> = [
    {id: 1, typecontrat: 'Contrat à durée indéterminée', datedebut: '01/01/2016', datefin: '', datefinPE: '30/04/2017', datesortie: ''},
  ];
  // @ts-ignore
  awaitingPersonList: Array<any> = Array.from(Array(1000).keys({
    id: 1,
    typecontrat: '',
    datedebut: '',
    datefin: '',
    datefinPE: '',
    datesortie: ''
  }));

  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {
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
