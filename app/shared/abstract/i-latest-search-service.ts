import {Observable} from 'rxjs';

export interface ILatestSearchService<T> {
  save(search: T): Observable<T>;

  fetch(count: number): Observable<Array<T>>
}
