import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {CompanyEnabledLeave} from '../../../model/response-payload/collaborators/congé/company-Enabled-leave';
import {CompanyHoliday} from '../../../model/response-payload/collaborators/congé/company-holiday';
import {Leave} from '../../../model/response-payload/collaborators/congé/leave';
import {LeaveRequest} from '../../../model/response-payload/collaborators/congé/leave-request';

@Injectable({
  providedIn: 'root'
})

export class LeavesService {
  collaboratorSelected: any;
  parameters: CompanyEnabledLeave;
  CompanyEnabledLeaveResultList: Array<Leave>;
  collaboratorResult: Leave = new Leave(
    {value: true, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: true, dirty: false, class: '', error: ''},
    {value: true, dirty: false, class: '', error: ''},
    {value: true, dirty: false, class: '', error: ''},
    {value: true, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: null, dirty: false, class: '', error: ''},
    true
  );
  baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/wind-leaves';
  // baseUrl: string = 'http://ns3012518.ip-149-202-74.eu:8762/';
  public CompanyHolidayList: Array<CompanyHoliday>;

  constructor(private http: HttpClient) {
  }

  getAllcompanyHoliday(): Observable<any> {
    return this.http.get<Array<CompanyHoliday>>(`${this.baseUrl}/company-holidays`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return  response;
    }));
  }
  getAllcompanyEnabledLeaveList(): Observable<any> {
    return this.http.get<Array<Leave>>(`${this.baseUrl}/leaves`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return this.CompanyEnabledLeaveResultList = response;
    }));
  }
  getAllcompanyEnabledLeaveByType(type: any): Observable<any> {
    return this.http.get<Array<Leave>>(`${this.baseUrl}/leaves/tenant-config/${type}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getLeaveByCollaborator(collaborator: any): Observable<any> {
    return this.http.get<Array<Leave>>(`${this.baseUrl}/collaborator-leave-rules/collaborator/${collaborator}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveApprovedByCollaborator(collaborator: any): Observable<any> {
    return this.http.get<Array<Leave>>(`${this.baseUrl}/leave-requests/collaborator/${collaborator}?status=APPROVED`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveRules(): Observable<any> {
    return this.http.get<Array<Leave>>(`${this.baseUrl}/company-leave-rules`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveRequest(fd: any, td: any ): Observable<any> {
    return this.http.get<Array<LeaveRequest>>(`${this.baseUrl}/leave-requests/period?fd=${fd}&td=${td}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveRequestbyperiodandtype(fd: any, td: any, type: any ): Observable<any> {
    let url = '';
    if (type === '' && fd !== 'Invalid date' && td !== 'Invalid date') {
         url = `${this.baseUrl}/leave-requests/period-type?fd=${fd}&td=${td}`;
      } else if (td === 'Invalid date' && fd !== 'Invalid date' && type !== '') {
      url = `${this.baseUrl}/leave-requests/period-type?fd=${fd}&type=${type}`;
    } else if (fd === 'Invalid date'  && td !== 'Invalid date' && type !== '') {
      url = `${this.baseUrl}/leave-requests/period-type?td=${td}&type=${type}`;
    }  else if (fd === 'Invalid date' && td === 'Invalid date' && type !== '') {
      url = `${this.baseUrl}/leave-requests/period-type?type=${type}`;
    } else if (type === '' && td === 'Invalid date'  && fd !== 'Invalid date') {
      url = `${this.baseUrl}/leave-requests/period-type?fd=${fd}`;
    } else if (type === '' && fd === 'Invalid date' && td !== 'Invalid date') {
      url = `${this.baseUrl}/leave-requests/period-type?td=${td}`;
    } else if (type === '' && fd === 'Invalid date' && td === 'Invalid date') {
      url = `${this.baseUrl}/leave-requests/period?td=&td=`;
    } else {
      url = `${this.baseUrl}/leave-requests/period-type?fd=${fd}&td=${td}&type=${type}`;
    }
    return this.http.get<Array<LeaveRequest>>(url, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveRequestByCollaborator(uuid: any ): Observable<any> {
    return this.http.get<Array<LeaveRequest>>(`${this.baseUrl}/leave-requests/collaborator/${uuid}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  // collaborator-leave-resource
  getAllLeaveByCollaborator(): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/collaborator-leave-rules`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  getAllLeaveByCollaboratorbyUuid(uuid: any): Observable<any> {
    return this.http.get<Array<any>>(`${this.baseUrl}/collaborator-leave-rules/collaborator/${uuid}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(map(response => {
      return response;
    }));
  }
  createCompanyEnabledLeaves(payload: { active: any; custom_type: any; days_in_advance: any; deductible: any; full_day: any; negative_credit: any; partial_day: any; simultaneously_limit: any; max_days: any; type: any; uuid: any }) {
    return this.http.post(`${this.baseUrl}/leaves`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createCompanyHoliday(payload: { day: any; month: any; payed: any; title: any; total_days: any ; uuid: any}) {
    return this.http.post(`${this.baseUrl}/company-holidays`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createRulesForCollaborator(payload: any) {
    return this.http.post(`${this.baseUrl}/collaborator-leave-rules`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  assignRulesForCollaborator(payload: {uuid: any, sick_uuid: any, payed_uuid: any} ) {
    return this.http.post(`${this.baseUrl}/collaborator-leave-rules/collaborator/${payload.uuid}/sickrule/${payload.sick_uuid}/payedrule/${payload.payed_uuid}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  revokeRulesForCollaborator(payload: {uuid: any, rule_uuid: any} ) {
    return this.http.delete(`${this.baseUrl}/collaborator-leave-rules/collaborator/${payload.uuid}/rule/${payload.rule_uuid}`, {
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

  createLeaveRule(payload: { is_default: any; name: any; leave: any, value: any; uuid: any}) {
    return this.http.post(`${this.baseUrl}/company-leave-rules`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  createLeaveRequest(payload: any) {
    return this.http.post(`${this.baseUrl}/leave-requests`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return [e.status]; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  deletecompanyEnabledLeaveList(uuid: any) {
    return this.http.delete(`${this.baseUrl}/leaves/${uuid}`, {
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

  deletecompanyHoliday(uuid: any) {
    return this.http.delete(`${this.baseUrl}/company-holidays/${uuid}`, {
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
  deletecompanyLeaveRule(uuid: any) {
    return this.http.delete(`${this.baseUrl}/company-leave-rules/${uuid}`, {
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
  deletecompanyLeaveRequest(uuid: any) {
    return this.http.delete(`${this.baseUrl}/leave-requests/${uuid}`, {
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

  updatecompanyEnabledLeaveList(leaveSelected: any) {
    return this.http.put(`${this.baseUrl}/leaves`, leaveSelected, {
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
  updatecompanyHoliday(holidaySelected: any) {
    return this.http.put(`${this.baseUrl}/company-holidays`, holidaySelected, {
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
  updatecompanyLeaveRule(ruleSelected: any) {
    return this.http.put(`${this.baseUrl}/company-leave-rules`, ruleSelected, {
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
  updatecompanyLeaveRequest(requestSelected: any) {
    return this.http.put(`${this.baseUrl}/leave-requests/${requestSelected.uuid}`, requestSelected.status, {
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
  decidecompanyLeaveRequest(decideSelected: any) {
    return this.http.patch(`${this.baseUrl}/leave-requests/${decideSelected.uuid}?decision=${decideSelected.decision}`, {
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
}
