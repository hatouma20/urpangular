import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {ChartDataSets} from 'chart.js';
import * as moment from 'moment';
import {Column} from 'ng-uikit/lib/datatable/datatable.interface';
import {Color, Label} from 'ng2-charts';
import {BehaviorSubject, Subject} from 'rxjs';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import {LeavesService} from '../../../../shared/services/back-end/leaves/leaves-service';

@Component({
  selector: 'wind-historiquebycollaborator-leave',
  templateUrl: './historiqueByCollaborator.component.html',
  styleUrls: ['./historiqueByCollaborator.component.css']
})
export class HistoriqueByCollaboratorComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  collaborator: any = {};
  creditHistoryByCollaborator: any = {};
  approvedLeaveList: Array<any> = [];
  public datasets: any;
  public data: any;
  private getAllLeaveByCollaboratorFinished = new BehaviorSubject(null);

  lineChartData: ChartDataSets[] = [];

  lineChartLabels: Label[] = [];
  allDistinctsYears = [];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#efcc0b',
      backgroundColor: '#efcc0b4f',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private leaveService: LeavesService,
              private currentRoute: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private sirhService: CollaboratorService,
              private location: Location
              ) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.currentRoute.params.subscribe(routeParams => {
      this.leaveService.getAllLeaveApprovedByCollaborator(routeParams.uuid).subscribe(response => {
        this.approvedLeaveList = response;
        this.dtTrigger.next();
      });
      this.getAllLeaveByCollaboratorFinished.next(false);
      this.leaveService.getAllLeaveByCollaboratorbyUuid(routeParams.uuid).subscribe(response => {
        this.creditHistoryByCollaborator = response;
        this.collaborator = {
          collaborator: response.collaborator,
          collaboratorname: '',
          current_payed_leave_credit: response.current_payed_leave_credit,
          current_sick_leave_credit: response.current_sick_leave_credit,
          rules: response.rules,
        };
        const allMonths = [];
        const payedLeaveHistory = [];
        const sickLeaveHistory = [];
        const allYears = [];
        response.credit_history.forEach(elt => {
          allYears.push(elt.year);
          const currentYear = (new Date()).getFullYear();
          if (currentYear === elt.year) {
          allMonths.push(moment(elt.month, 'M').format('MMMM'));
          if (elt.type === 'PAYED_LEAVE') {
            payedLeaveHistory.push(elt.credit);
          }
          if (elt.type === 'SICK_LEAVE') {
            sickLeaveHistory.push(elt.credit);
          }
        }
        });
        const unique = (value, index, self) => {
          return self.indexOf(value) === index;
        };
        this.lineChartLabels = allMonths.filter(unique);
        this.allDistinctsYears = allYears.filter(unique);
        this.lineChartData = [
          { data: payedLeaveHistory, label: 'Payed leave' },
          { data: sickLeaveHistory, label: 'sick Leave' },
        ];
        this.getAllLeaveByCollaboratorFinished.next(true);
      });
      this.getAllLeaveByCollaboratorFinished.subscribe(value => {
        if (value) {
          this.sirhService.getCollaborator(this.collaborator.collaborator).subscribe(response => {
            this.collaborator.collaboratorname = response.firstname + ' ' + response.lastname;
          });
        }
      });
    });
  }

  filterWithYear(event: any) {
    const selectedYear = Number(event.target.value);
    const allMonths = [];
    const payedLeaveHistory = [];
    const sickLeaveHistory = [];
    this.creditHistoryByCollaborator.credit_history.forEach(elt => {
      if (selectedYear === elt.year) {
        allMonths.push(moment(elt.month, 'M').format('MMMM'));
        if (elt.type === 'PAYED_LEAVE') {
          payedLeaveHistory.push(elt.credit);
        }
        if (elt.type === 'SICK_LEAVE') {
          sickLeaveHistory.push(elt.credit);
        }
      }
    });
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    this.lineChartLabels = allMonths.filter(unique);
    this.lineChartData = [
      { data: payedLeaveHistory, label: 'Payed leave' },
      { data: sickLeaveHistory, label: 'sick Leave' },
    ];
  }
   onPreview() {
     let printContents = '';
     let htmlData = '';
     const WindowObject = window.open('');
     printContents += `<table class="table table-bordered table-responsive-md table-striped text-center" >
                   <tr style="background: #9a9a9a">
                     <th class="text-center">Collaborator</th>
                     <th class="text-center">Date fin</th>
                     <th class="text-center">Date Debut</th>
                     <th class="text-center">Nombres des heures</th>
                     <th class="text-center">Raison</th>
                     <th class="text-center">Type</th>
                   </tr>`;
     this.approvedLeaveList.map(data => {
       printContents += `<tr>
                     <td style="border: 1px solid black; padding: 0.2%">${data.collaborator}</td>
                     <td style="border: 1px solid black;padding: 0.2%">${data.end_date}</td>
                     <td style="border: 1px solid black;padding: 0.2%">${data.start_date}</td>
                     <td style="border: 1px solid black;padding: 0.2%">${data.hours}</td>
                     <td style="border: 1px solid black;padding: 0.2%">${data.reason}</td>
                     <td style="border: 1px solid black;padding: 0.2%">${data.leave.type}</td>
                   </tr>`;
       htmlData = `<html><body>${printContents}</body></html>`;
     });
     WindowObject.document.write(htmlData);
     WindowObject.print();
     WindowObject.document.close();
   }
  backClicked() {
    this.location.back();
  }
}
