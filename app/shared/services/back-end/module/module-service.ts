import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  //baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-module';
  baseUrl: string = 'http://localhost:8600';
  constructor(private http: HttpClient) {}

  getAllModules(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/modules`).pipe(map(response => {
      return  response;
    }));
  }
}
