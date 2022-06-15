import {Component, OnInit} from '@angular/core';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  editField: string;
  contractList: Array<any> = [
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

  constructor(private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.contractService.getAllContract().subscribe(response =>
      this.contractList = response);
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.contractList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.contractList[id]);
    this.contractList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.contractList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
