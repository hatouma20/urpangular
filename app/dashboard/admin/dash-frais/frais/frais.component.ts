import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dash-default',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {
  editField: string;
  personList: Array<any> = [
    {id: 1, dateeffet: '14/01/2015', IFR: '', tauxfrais: '0.00%', fraisrepas: '', fraistechnologie: '', fraiskilometrique: ''},
  ];
  // @ts-ignore
  awaitingPersonList: Array<any> = Array.from(Array(1000).keys({
    id: 1,
    dateeffet: '',
    IFR: '',
    tauxfrais: '',
    fraisrepas: '',
    fraistechnologie: '',
    fraiskilometrique: ''
  }));

  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  updateListcheckbox(id: number, property: string, event: any) {
    const editField = event.target.checked;
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
