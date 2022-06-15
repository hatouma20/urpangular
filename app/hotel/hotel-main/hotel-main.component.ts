import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {latestsHotels} from '../../fake/data/latest-search';
import {ILatestSearch} from '../../shared/abstract/i-latest-search';
import {LATEST_SEARCH_COUNT} from '../../shared/constants/search';
import {HotelLatestSearch} from '../../shared/model/data/hotel-latest.search';
import {LatestSearchService} from '../../shared/services/back-end/hotel/latest-search.service';

@Component({
  selector: 'wind-hotel-main',
  templateUrl: './hotel-main.component.html',
  styleUrls: ['./hotel-main.component.scss']
})
export class HotelMainComponent implements OnInit {

  latestSearches: Array<HotelLatestSearch>;

  constructor(private hotelLatestSearchService: LatestSearchService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.loadLatestSearches();
  }

  public onLatestSearchSelected($event: ILatestSearch) {
    this.logger.trace($event);
  }

  loadLatestSearches() {
    this.hotelLatestSearchService.fetch(LATEST_SEARCH_COUNT).subscribe(data => this.latestSearches = latestsHotels);
  }
}
