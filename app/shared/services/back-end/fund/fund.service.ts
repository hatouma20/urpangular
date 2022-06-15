import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as JWT from 'jwt-decode';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {CollaboratorModel} from '../../../model/response-payload/collaborators/collaborator-model';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class FundService {
  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-fund';

  constructor(private http: HttpClient) {
  }

  getAllCaisses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/caisse`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
}
