import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, timeout} from 'rxjs/operators';
import {SEARCH_TIMOUT} from '../../../constants/search';

@Injectable({
  providedIn: 'root'
})
export class FlightBookService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
  }

  book(flight: any) {
    return this.http.post(this.baseUrl, {}).pipe(
      timeout(SEARCH_TIMOUT),
      map(response => undefined /*TODO map actual response*/)
    );
  }
}
