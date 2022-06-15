import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NGXLogger} from 'ngx-logger';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {ContractService} from '../../../../shared/services/back-end/contract/contract-service';

@Component({
  selector: 'wind-infocontrat',
  templateUrl: './info-contrat.component.html',
  styleUrls: ['info-contrat.component.css']
})
export class InfoContratComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['Type de Contrat', 'Durée du contrat', 'Salaire', 'Periode de Test'];
  dataSource: any;
  constructor(private logger: NGXLogger,
              private contractService: ContractService,
              private sirhService: CollaboratorService,
              ) {
  }

  ngOnInit(): void {
    const currentuuid = this.sirhService.uuid.access_id;
    this.contractService.getContratByCollaborator(currentuuid).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
