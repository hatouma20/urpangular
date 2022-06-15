import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {CompanyHoliday} from '../../../model/response-payload/collaborators/congé/company-holiday';

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  //baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-sirh';
  baseUrl: string = 'http://localhost:9200';
  constructor(private http: HttpClient) {
}
// Contract Ressource
  getAllContract(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/contracts/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  getAllContractDocument(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/contractdocument/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  deleteContract(id: any) {
    return this.http.delete(`${this.baseUrl}/contracts/delete/${id}`, {
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
  updateContract(payload: any) {
    return this.http.post(`${this.baseUrl}/contracts/update`, payload, {
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
  createContract(payload: any) {
    return this.http.post(`${this.baseUrl}/contracts/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createSalary(payload: any) {
    return this.http.post(`${this.baseUrl}/salary/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createTrial(payload: any) {
    return this.http.post(`${this.baseUrl}/config/contract/trial-period/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  // Contract Duration
  getAllContractDuration(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/config/contract/duration/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  createContractDuattion(payload: any) {
    return this.http.post(`${this.baseUrl}/config/contract/duration/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  deleteContractDuration(id: any) {
    return this.http.delete(`${this.baseUrl}/config/contract/duration/delete/${id}`, {
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
  updateContractDuation(payload: any) {
    return this.http.post(`${this.baseUrl}/config/contract/duration/update`, payload, {
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
  // Contract Type
  getAllContractType(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/config/contract/type/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  createContractType(payload: any) {
    return this.http.post(`${this.baseUrl}/config/contract/type/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  deleteContractType(id: any) {
    return this.http.delete(`${this.baseUrl}/config/contract/type/delete/${id}`, {
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
  updateContractType(payload: any) {
    return this.http.post(`${this.baseUrl}/config/contract/type/update`, payload, {
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
  // hiring reason
  getAllhiringReason(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/config/hiring/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  createhiringReason(payload: any) {
    return this.http.post(`${this.baseUrl}/config/hiring/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  deletehiringReason(id: any) {
    return this.http.delete(`${this.baseUrl}/config/hiring/delete/${id}`, {
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
  updatehiringReason(payload: any) {
    return this.http.post(`${this.baseUrl}/config/hiring/update`, payload, {
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
  // leaving reason
  getAllLeavingReason(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/config/leave/create`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  createLeavingReason(payload: any) {
    return this.http.post(`${this.baseUrl}/config/leave/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  deleteLeavingReason(id: any) {
    return this.http.delete(`${this.baseUrl}/config/leave/delete/${id}`, {
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
  updateLeavingReason(payload: any) {
    return this.http.post(`${this.baseUrl}/config/leave/update`, payload, {
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
  // get contrat by collaborator
  getContratByCollaborator(uuid: any): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/contracts/collaborator/${uuid}/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
}
