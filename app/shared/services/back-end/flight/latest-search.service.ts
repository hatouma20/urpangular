import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import {ILatestSearch} from '../../../abstract/i-latest-search';
import {ILatestSearchService} from '../../../abstract/i-latest-search-service';
import {SEARCH_TIMOUT} from '../../../constants/search';
import {FlightLatestSearch} from '../../../model/data/flight-latest-search';

@Injectable({
  providedIn: 'root'
})
export class LatestSearchService implements ILatestSearchService<FlightLatestSearch> {

  payload: BehaviorSubject<Array<ILatestSearch>> = new BehaviorSubject<Array<ILatestSearch>>(null);
  private baseUrl: string = 'api/heroes';

  constructor(private http: HttpClient) {
  }

  public fetch(count: number): Observable<Array<FlightLatestSearch>> {
    return this.http.get<Array<FlightLatestSearch>>(this.baseUrl, {params: new HttpParams().set('count', String(count))}).pipe(
      timeout(SEARCH_TIMOUT),
      map(response => [] /*TODO map response*/)
    );
  }

  public save(T): Observable<FlightLatestSearch> {
    return undefined;
  }
}
