import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as JWT from 'jwt-decode';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import {GLOBAL_AJAX_TIMEOUT} from '../../../constants/global';
import {SKIP_AUTH_INTERCEPTOR_HEADER, TOKEN_REFRESH_HEADER} from '../../../constants/header';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {Account} from '../../../model/data/account';
import {Authentication} from '../../../model/request-payload/authentication';
import {Register} from '../../../model/request-payload/register';
import {CollaboratorModel} from '../../../model/response-payload/collaborators/collaborator-model';
import {Token} from '../../../model/response-payload/token';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-auth';
  authenticationToken: Token;
  isAuthenticated = false;
  public role: string;
  public connectedUser: any = null;
  public uuid: any = null;
  private interceptorSkipHeader = new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value);

  constructor(private http: HttpClient,
              private localSt: LocalStorageService ) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      (token !== '' && token !== undefined) ? this.isAuthenticated = true : this.isAuthenticated = false;
    } );
  }

  authenticate(payload: Authentication): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}`, payload,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}).pipe(map(response => {
      this.isAuthenticated = true;
      return response;
    }));
  }

  refreshToken(token: any): Observable<Token> {
    return this.http.post(`${this.baseUrl}/refresh`, token, {
      headers: new HttpHeaders().append(TOKEN_REFRESH_HEADER.name, TOKEN_REFRESH_HEADER.value)
                                .append(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)
    }).pipe(
      timeout(GLOBAL_AJAX_TIMEOUT),
      map((response: string) => {
        return new Token(response);
      })
    );
  }
  resetPassword(payload: any): any {
    return ;
  }
  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/expire`).pipe(map(response => {
      return response;
    }));
    this.isAuthenticated = false;
  }
}
