import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {LatestSearchComponent} from '../../shared/components/latest-search/latest-search.component';

@Component({
  selector: 'wind-hotel-latest',
  templateUrl: './hotel-latest.component.html',
  styleUrls: ['./hotel-latest.component.scss']
})
export class HotelLatestComponent extends LatestSearchComponent implements OnInit {

  constructor(private logger: NGXLogger) {
    super();
  }

  ngOnInit(): void {
  }

}
