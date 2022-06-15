import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import { catchError, map, timeout } from 'rxjs/internal/operators';
import {SKIP_AUTH_INTERCEPTOR_HEADER} from '../../../constants/header';
import {BankAccountRequestForm} from '../../../model/request-payload/fournisseur/bank-account-form';
import {ContactAdresseRequestForm} from '../../../model/request-payload/fournisseur/contact-adress-form';
import {FournisseurRequestForm} from '../../../model/request-payload/fournisseur/fournisseur-request-form';
import {FournisseurResult} from '../../../model/response-payload/fournisseur/fournisseur-result';
import {VirementResult} from "../../../model/response-payload/caisse/virement-result";
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  fournisseuraddresult: FournisseurResult;
  fournisseurResultList: Array<FournisseurResult>;
  fournisseurResultName: string[];
  fournisseurResultCode: string[];
  adresseseResultList: Array<ContactAdresseRequestForm>;
  compteResultList: Array<BankAccountRequestForm>;
  parametersAdd: FournisseurRequestForm;
  uuidfournisseur: string;
  parametersAddadress: ContactAdresseRequestForm;
  parametersAddaccountBank: BankAccountRequestForm;
  baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-crm/tiers';
  baseUrlAdresse = 'http://ns3012518.ip-149-202-74.eu:8762/wind-crm/address';
  baseUrlBank = 'http://ns3012518.ip-149-202-74.eu:8762/wind-crm/bank-accounts';
  addResult: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}
  // tiers
  add() {
    const payload = {
      name: this.parametersAdd.name.value,
      alternative_Name: this.parametersAdd.alternativeName.value,
      nature: this.parametersAdd.nature.value,
      code: this.parametersAdd.code.value,
      state: this.parametersAdd.state.value,
      phone: this.parametersAdd.tel.value,
      fax: this.parametersAdd.fax.value,
      email: this.parametersAdd.email.value,
      web: this.parametersAdd.web.value,
      rc: this.parametersAdd.rc.value,
      tax_Registration: this.parametersAdd.taxRegistration.value,
      capital: this.parametersAdd.capital.value,
      vat_Liable: this.parametersAdd.tvaLiable.value,
      vat_Number: this.parametersAdd.tvaNumber.value,
      vat_File: '',
      vat_Start_Date: this.parametersAdd.datedebut.value,
      vat_End_Date: this.parametersAdd.datefin.value,
      tiers_Type: this.parametersAdd.tiersType.value,
      employee: this.parametersAdd.employee.value,
      type_LegEnt: this.parametersAdd.typeLegEnt.value,
      country_Code: this.parametersAdd.country.value
    };
    return this.http.post(`${this.baseUrl}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  getAllTiers(): Observable<any> {
    return this.http.get<Array<FournisseurResult>>(`${this.baseUrl}`).pipe(map(response => {
      return this.fournisseurResultList = response;
    }));
  }
  getfiltredtiers(name: string): Observable<any> {
    return this.http.get<Array<FournisseurResult>>(`${this.baseUrl}/getfiltredtiers/${name}`,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(map(response => {
      // this.fournisseurResultName = [];
      // response.forEach(elt => {
      //   this.fournisseurResultName.push(elt.name);
      // });
      // return this.fournisseurResultName;
      return response;
    }));
  }
  getfiltredtiersbyCode(code: string): Observable<any> {
    return this.http.get<Array<FournisseurResult>>(`${this.baseUrl}/getfiltredtiersbycode/${code}`).pipe(map(response => {
      // this.fournisseurResultCode = [];
      // response.forEach(elt => {
      //   this.fournisseurResultCode.push(elt.code);
      // });
      // return this.fournisseurResultCode;
      return response;
    }));
  }

  getAllfournisseur(): Observable<any> {
    return this.http.get<Array<FournisseurResult>>(`${this.baseUrl}`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.fournisseurResultList = response;
    }));
  }

  deletetiers(uuid: any) {
    return this.http.delete(`${this.baseUrl}/${uuid}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return [];
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  gettiers(uuid: string): Observable<any> {
    return this.http.get<FournisseurResult>(`${this.baseUrl}/${uuid}`).pipe(map(response => {
      return this.fournisseuraddresult = response;
    }));
  }



  // adresses
  addadresse() {
    const payload = {
      tiers: {
        uuid: this.uuidfournisseur,
      },
      name: this.parametersAddadress.name.value,
      first_name: this.parametersAddadress.firstname.value,
      civility: this.parametersAddadress.civility.value,
      function: this.parametersAddadress.ownerfunction.value,
      location: this.parametersAddadress.address.value,
      zipCode: this.parametersAddadress.zipCode.value,
      city: this.parametersAddadress.city.value,
      department: this.parametersAddadress.department.value,
      profPhone: this.parametersAddadress.profPhone.value,
      mobile: this.parametersAddadress.mobile.value,
      fax: this.parametersAddadress.fax.value,
      email: this.parametersAddadress.email.value,
      isDefault: this.parametersAddadress.isdefault.value,
    };
    return this.http.post(`${this.baseUrlAdresse}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  getAllAdresses(): Observable<any> {
    return this.http.get<Array<ContactAdresseRequestForm>>(`${this.baseUrlAdresse}`,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(map(response => {
      return this.adresseseResultList = response;
    }));
  }
  deleteadresse(uuid: any) {
    return this.http.delete(`${this.baseUrlAdresse}/${uuid}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return [];
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  // Accounts Bank
  addaccountbank() {
    const payload = {
      tiers: {
        uuid: this.uuidfournisseur,
      },
      bank_Account_Name: this.parametersAddaccountBank.bankAccountName.value,
      bank: this.parametersAddaccountBank.bank.value,
      account_Number: this.parametersAddaccountBank.accountNumber.value,
      iban: this.parametersAddaccountBank.iban.value,
      bic_Code: this.parametersAddaccountBank.bicCode.value,
      domiciliation: this.parametersAddaccountBank.domiciliation.value,
      owner_Name: this.parametersAddaccountBank.ownerName.value,
      owner_Address: this.parametersAddaccountBank.ownerAddress.value,
     };
    return this.http.post(`${this.baseUrlBank}`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  getAllAccounts(): Observable<any> {
    return this.http.get<Array<BankAccountRequestForm>>(`${this.baseUrlBank}`,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(map(response => {
      return this.compteResultList = response;
    }));
  }
  deleteaccount(uuid: any) {
    return this.http.delete(`${this.baseUrlBank}/${uuid}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      timeout(60000),
      catchError((e, c) => {
        return [];
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  public adaptSearchResult(data: any): any {}



  createstock(payload: any) {
    return this.http.post(`${this.baseUrl}/create`, payload).pipe(
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
