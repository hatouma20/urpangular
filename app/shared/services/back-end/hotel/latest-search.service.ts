import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ILatestSearch} from '../../../abstract/i-latest-search';
import {ILatestSearchService} from '../../../abstract/i-latest-search-service';
import {HotelLatestSearch} from '../../../model/data/hotel-latest.search';

@Injectable({
  providedIn: 'root'
})
export class LatestSearchService implements ILatestSearchService<HotelLatestSearch> {
  payload: BehaviorSubject<Array<ILatestSearch>> = new BehaviorSubject<Array<ILatestSearch>>(null);

  constructor() {
  }

  public fetch(count: number): Observable<Array<HotelLatestSearch>> {
    return this.payload.asObservable(); // TODO
  }

  public save(search: HotelLatestSearch): Observable<HotelLatestSearch> {
    return undefined; // TODO
  }
}
