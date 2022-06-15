import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import {ISearchRequest} from '../../../abstract/i-search-request';
import {ISearchResponse} from '../../../abstract/i-search-response';
import {ISearchService} from '../../../abstract/I-search-service';
import {SEARCH_TIMOUT} from '../../../constants/search';
import {FlightSearchResult} from '../../../model/response-payload/flight/flight-search.result';
import {HotelSearchResult} from '../../../model/response-payload/hotel/hotel-search.result';

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService implements ISearchService {

  constructor(private http: HttpClient) {
  }

  public search(payload: ISearchRequest): Observable<ISearchResponse> {
    return this.http.post<FlightSearchResult>('', payload).pipe(
      timeout(SEARCH_TIMOUT),
      map((response: any) => new HotelSearchResult() /*TODO do mappings*/)
    );
  }
}
