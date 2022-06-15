import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import {ISearchRequest} from '../../../abstract/i-search-request';
import {ISearchResponse} from '../../../abstract/i-search-response';
import {ISearchService} from '../../../abstract/I-search-service';
import {GLOBAL_AJAX_TIMEOUT} from '../../../constants/global';
import {SEARCH_TIMOUT} from '../../../constants/search';
import {FlightSearchResult} from '../../../model/response-payload/flight/flight-search.result';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService implements ISearchService {

  constructor(private http: HttpClient) {
  }

  public search(payload: ISearchRequest): Observable<ISearchResponse> {
    return this.http.post<FlightSearchResult>('', payload).pipe(
      timeout((SEARCH_TIMOUT) ? SEARCH_TIMOUT : GLOBAL_AJAX_TIMEOUT),
      map((response: any) => new FlightSearchResult() /*TODO do mappings*/)
    );
  }
}
