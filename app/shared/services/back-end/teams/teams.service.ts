import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {CollaboratorModel} from '../../../model/response-payload/collaborators/collaborator-model';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import * as JWT from 'jwt-decode';
import {TeamModel} from '../../../model/response-payload/collaborators/teams/team';

@Injectable({
  providedIn: 'root'
})

export class TeamsService {

  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh';
  public uuid: any;
  teamsResultList: Array<TeamModel>;
  public teamResult: any;

  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }

  createTeam(payload: any) {
    return this.http.post(`${this.baseUrl}/teams/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getTeam(uuid: string): Observable<any> {
    return this.http.get<TeamModel>(`${this.baseUrl}/teams/${uuid}`).pipe(map(response => {
      return this.teamResult = response;
    }));
  }
  update(currentTeams: any) {
    return this.http.put(`${this.baseUrl}/teams/update`, currentTeams, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }



  delete(id: any) {
    return this.http.delete(`${this.baseUrl}/teams/delete/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getAllTeam(): Observable<any> {
    return this.http.get<Array<TeamModel>>(`${this.baseUrl}/teams/list`).pipe(map(response => {
      return this.teamsResultList = response;
    }));
  }

  updateManagerTeam(uuidCollaborator: any, uuidTeam: any) {
    return this.http.post(`${this.baseUrl}/teams/update-manager/${uuidCollaborator}/${uuidTeam}`, {
      headers: new HttpHeaders().set('Content-team', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

}
