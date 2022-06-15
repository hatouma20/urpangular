import {Observable} from 'rxjs';
import {ISearchRequest} from './i-search-request';
import {ISearchResponse} from './i-search-response';

export interface ISearchService {
  search(payload: ISearchRequest): Observable<ISearchResponse>
}
