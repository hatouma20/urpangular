import {Injectable} from '@angular/core';
import {map, timeout} from 'rxjs/operators';
import {GLOBAL_AJAX_TIMEOUT} from '../../../constants/global';
import {Register} from '../../../model/request-payload/register';
import {Observable} from 'rxjs';
import {Account} from '../../../model/data/account';
import {HttpClient} from '@angular/common/http';

import {PartnerModel} from '../../../model/response-payload/partner/PartnerModel';
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {AUTHENTICATION_KEY} from "../../../constants/local-storage-keys";
import * as JWT from "jwt-decode";
import {PartnerAddressModel} from "../../../model/response-payload/partner/AddressPartnerModel";
import {PartnerRibModel} from "../../../model/response-payload/partner/RibPartnerModel";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-partner';
  private patternResult: PartnerModel;
  public partnerAddressResult: PartnerAddressModel;
  public partnerRibResult: PartnerRibModel;
  private uuid: any;
  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }

  register(payload: Register): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/partners`, payload).pipe(
      timeout(GLOBAL_AJAX_TIMEOUT),
      map((response: any) => new Account())/*TODO map account data*/
    );
  }

  getPartner(): Observable<any> {
     return this.http.get<PartnerModel>(`${this.baseUrl}/partners/my-partner`).pipe(map(response => {
      return this.patternResult = response;
     }));
  }

  getPartnerAddress(): Observable<any> {
    return this.http.get<PartnerAddressModel>(`${this.baseUrl}/addresses`).pipe(map(response => {
      return this.partnerAddressResult = response;
    }));
  }
  getPartnerRib(): Observable<any> {
    return this.http.get<PartnerRibModel>(`${this.baseUrl}/bank-accounts`).pipe(map(response => {
      return this.partnerRibResult = response;
    }));
  }
  affectModuletoPartner(uuid: Array<string>): Observable<any> {
    return this.http.post<Account>(`${this.baseUrl}/partners/${this.uuid.access_id}/modules/acquire`, uuid).pipe(
      timeout(GLOBAL_AJAX_TIMEOUT),
      map((response: any) => response)
    );
  }
}
