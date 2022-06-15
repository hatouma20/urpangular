import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILatestSearch} from '../../abstract/i-latest-search';

@Component({
  selector: 'wind-latest-search',
  templateUrl: './latest-search.component.html',
  styleUrls: ['./latest-search.component.scss']
})
export class LatestSearchComponent implements OnInit {

  @Input() items: Array<ILatestSearch>;
  @Output() itemSelected: EventEmitter<ILatestSearch> = new EventEmitter<ILatestSearch>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onItemSelect(item: ILatestSearch) {
    this.itemSelected.emit(item);
  }

}
