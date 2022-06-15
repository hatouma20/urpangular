import {Component, OnInit} from '@angular/core';
import {latestsFlights} from '../../fake/data/latest-search';
import {LatestSearchComponent} from '../../shared/components/latest-search/latest-search.component';
import {LATEST_SEARCH_COUNT} from '../../shared/constants/search';
import {LatestSearchService} from '../../shared/services/back-end/flight/latest-search.service';

@Component({
  selector: 'wind-flight-latest',
  templateUrl: './flight-latest.component.html',
  styleUrls: ['./flight-latest.component.scss']
})
export class FlightLatestComponent extends LatestSearchComponent implements OnInit {

  constructor(private latestSearchService: LatestSearchService) {
    super();
  }

  ngOnInit(): void {
    this.loadLatestSearches();
  }

  loadLatestSearches() {
    this.latestSearchService.fetch(LATEST_SEARCH_COUNT).subscribe(data => this.items = latestsFlights/*this.latestSearches = data*/);
  }
}
