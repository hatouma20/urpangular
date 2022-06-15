import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {ILatestSearch} from '../../shared/abstract/i-latest-search';
import {FlightLatestSearch} from '../../shared/model/data/flight-latest-search';

@Component({
  selector: 'wind-flight-main',
  templateUrl: './flight-main.component.html',
  styleUrls: ['./flight-main.component.scss']
})
export class FlightMainComponent implements OnInit {

  latestSearches: Array<FlightLatestSearch>;

  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {
  }

  public onLatestSearchSelected($event: ILatestSearch) {
    this.logger.trace($event);
  }
}
