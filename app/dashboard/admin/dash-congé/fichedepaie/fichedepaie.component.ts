import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'wind-fiche-de-paie',
  templateUrl: './fichedepaie.component.html',
  styleUrls: ['fichedepaie.component.css']
})
export class FichedepaieComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ficheList = [];
  constructor() {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.ficheList = [
      {
      collaborator: 'foulen',
      document: 'ss',
    }, {
      collaborator: 'foulen2',
      document: 'ff',
    },
    ];
    this.dtTrigger.next();
  }
}
