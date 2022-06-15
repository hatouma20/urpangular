import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as JWT from 'jwt-decode';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {Language} from '../../../model/language';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private uuid: any;
  //baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-billing/invoice/languages';
  baseUrl = 'http://localhost:9800/invoice/languages';
  languageResult: Language;

  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }

  getLanguageList(): Observable<any> {
    return this.http.get<Language>(`${this.baseUrl}`).pipe(map(response => {
      return this.languageResult = response;
    }));
  }
}
