import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as JWT from 'jwt-decode';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {AUTHENTICATION_KEY} from '../../../constants/local-storage-keys';
import {CollaboratorModel} from '../../../model/response-payload/collaborators/collaborator-model';
import {PayrollResult} from '../../../model/response-payload/payroll/payroll';
import {PayrollNumberResult} from '../../../model/response-payload/payroll/payrollnumber';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class PayrollService {

  baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-billing';
  payroll: PayrollResult;
  payrollnumber: PayrollNumberResult;
  public uuid: any;
  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }
  getAllInvoices(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/order/`).pipe(map(response => {
      return response;
    }));
  }

  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transaction`).pipe(map(response => {
      return response;
    }));
  }
  getFactureNumber(name: string): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/order/generate_Billing_Number/${name}`).pipe(map(response => {
      return this.payrollnumber = response;
    }));
  }
  payer(paymentModel: any) {
    return this.http.post(`${this.baseUrl}/invoice/payer`, paymentModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
