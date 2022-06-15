import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {CollaboratorModel} from '../../../model/response-payload/collaborators/collaborator-model';
import * as JWT from 'jwt-decode';
import {LeaveRequest} from '../../../model/response-payload/collaborators/congé/leave-request';
import {LocalStorageService} from '../../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})

export class CollaboratorService {
  parameters: CollaboratorModel;
  collaboratorResultList: Array<CollaboratorModel>;
  public collaboratorResult: any;
  public uuid: any;
  public rememberme: any;
  formData = new FormData();
  public role: any;
  // baseUrl: string = 'http://vps-dc5e7b86.vps.ovh.net:8762';
  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh';

  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }

  getCollaborator(uuid: string): Observable<any> {
    const url = `${this.baseUrl}/collaborators/${uuid}`;
    return this.http.get<CollaboratorModel>(`${this.baseUrl}/collaborators/${uuid}`).pipe(map(response => {
      return this.collaboratorResult = response;
    }));
  }
  getClause(uuid: string): Observable<any> {
    return this.http.get<CollaboratorModel>(`${this.baseUrl}/clause/${uuid}`).pipe(map(response => {
      return response;
    }));
  }


  addpicture(formData: any, uuid: any) {
    return this.http.post(`${this.baseUrl}/collaborators/uploadFiles/${uuid}`, formData).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }


  getAllCollaborators(): Observable<any> {
    return this.http.get<Array<CollaboratorModel>>(`${this.baseUrl}/collaborators/list`).pipe(map(response => {
      return this.collaboratorResultList = response;
    }));
  }

  getcollaboratornotaffected(): Observable<any> {
    return this.http.get<Array<CollaboratorModel>>(`${this.baseUrl}/collaborators/listNotAffectedtoTeam`).pipe(map(response => {
      return this.collaboratorResultList = response;
    }));
  }
  AffectCollaborator(currentCollaborator: any) {
    return this.http.post(`${this.baseUrl}/collaborators/affect-collaborator-team`, currentCollaborator, {
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

  AffectCollaboratorTeam(uuidCollaborator: any, uuidTeam: any) {
    return this.http.post(`${this.baseUrl}/collaborators/affect-collaborator-team/${uuidCollaborator}/${uuidTeam}`, {
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


  DesaffectCollaboratorTeam(uuidCollaborator: any) {
    return this.http.post(`${this.baseUrl}/collaborators/desaffect-collaborator-team/${uuidCollaborator}`, {
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

  getAllClauses(): Observable<any> {
    return this.http.get<Array<CollaboratorModel>>(`${this.baseUrl}/clause/list`).pipe(map(response => {
      return response;
    }));
  }
  ModifyProfile(currentCollaborator: any) {
    return this.http.put(`${this.baseUrl}/collaborators/update`, currentCollaborator, {
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

  deleteCollaborator(payload: any) {
    return this.http.put(`${this.baseUrl}/collaborators/delete`, payload,{
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
  createCollaborator(payload: any) {
    return this.http.post(`${this.baseUrl}/collaborators/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createContractDocument(payload: any) {
    return this.http.post(`${this.baseUrl}/contractdocument/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  checkcin(payload: any) {
    return this.http.post(`${this.baseUrl}/collaborators/checkCardNumber/${payload}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    ); }

  checkmatricule(payload: any) {
    return this.http.post(`${this.baseUrl}/collaborators/checkmatricule/${payload}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    ); }

  checkAccountNumber(payload: any) {
    return this.http.post(`${this.baseUrl}/bankcollaborators/checkaccountnumber/${payload}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getCollaboratorInTeam(uuidTeam: string): Observable<any> {
    return this.http.get<CollaboratorModel>(`${this.baseUrl}/collaborators/listCollaboratorsByTeam/${uuidTeam}`).pipe(map(response => {
      return this.collaboratorResult = response;
    }));
  }

  filterCollaborator(cin: any, matricule: any, team: any, isdeleted: any): Observable<any> {
    return this.http.get<Array<LeaveRequest>>(`${this.baseUrl}/collaborators/filterCollaborator`,  {
      headers: new HttpHeaders().set('Content-team', 'application/json'), params: this.setParams(cin, matricule, team, isdeleted)
    }).pipe(map(response => {
      return response;
    }));
  }

  private setParams(cin: any, matricule: any, team: any, isdeleted: any): HttpParams {
    let params = new HttpParams();
    // .set('cin', cin)
    // .set('matricule', matricule)
    // .set('isdeleted', isdeleted)
    // .set('team', team)
    if (cin !== '') {
      params = params.set('cin', cin);
    }
    if (matricule !== '') {
      params = params.set('matricule', matricule);
    }
    if (isdeleted != null) {
      params = params.set('isdeleted', isdeleted);
    }
    if (team !== '') {
      params = params.set('team', team);
    }
    console.log(params.toString());
    return params;
  }
  createClause(payload: any) {
    return this.http.post(`${this.baseUrl}/clause/create`, payload).pipe(
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
