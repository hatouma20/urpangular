import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {PayrollResult} from '../../../model/response-payload/payroll/payroll';
import {PayrollNumberResult} from '../../../model/response-payload/payroll/payrollnumber';
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {AUTHENTICATION_KEY} from "../../../constants/local-storage-keys";
import * as JWT from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class BuillingService {

  baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-billing';
  payroll: PayrollResult;
  billingnumber: PayrollNumberResult;
  public uuid: any;
  constructor(private http: HttpClient,
              private localSt: LocalStorageService) {
    localSt.getItem(AUTHENTICATION_KEY).subscribe( (token: string) => {
      this.uuid = JWT(token);
    } );
  }


  getFactureNumber(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/invoice/generate_Billing_Number`).pipe(map(response => {
      return this.billingnumber = response;
    }));
  }
  getBonCommandeNumber(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/purshaseorder/generate_Purshase_Number`).pipe(map(response => {
      return  response;
    }));
  }
  getBonReceptionNumber(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/receipt/generate_Receipt_Number/`).pipe(map(response => {
      return  response;
    }));
  }
  getAllCommandeFournisseur(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/purshaseorder`).pipe(map(response => {
      return response;
    }));
  }
  getAllFactureAchat(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/invoice/getAllPurshaseInvoice`).pipe(map(response => {
      return response;
    }));
  }

  getAllBonReception(): Observable<any> {
    return this.http.get<PayrollNumberResult>(`${this.baseUrl}/receipt`).pipe(map(response => {
      return response;
    }));
  }
  getPayedTransactions(uuid: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transaction/getTransactionsByInvoice/${uuid}`).pipe(map(response => {
      return response;
    }));
  }

  createInvoice(payload: any) {
    return this.http.post(`${this.baseUrl}/invoice/`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  payer(payload: any) {
    return this.http.post(`${this.baseUrl}/invoice/payer`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  updateInvoice(payload: any) {
    return this.http.put(`${this.baseUrl}/invoice/`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  createBonRecept(payload: any) {
    return this.http.post(`${this.baseUrl}/receipt`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  updateBonRecept(payload: any) {
    return this.http.put(`${this.baseUrl}/receipt`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  createBonCommande(payload: any) {
    return this.http.post(`${this.baseUrl}/purshaseorder`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  updateBonCommande(payload: any) {
    return this.http.put(`${this.baseUrl}/purshaseorder`, payload).pipe(
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
