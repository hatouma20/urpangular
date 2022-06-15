import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable} from 'rxjs/index';
import { catchError, map, timeout } from 'rxjs/internal/operators';
import {SKIP_AUTH_INTERCEPTOR_HEADER} from '../../../constants/header';
import {ChequeRequestForm} from '../../../model/request-payload/caisse/cheque-request-form';
import {CompteFinanceRequestForm} from '../../../model/request-payload/caisse/compte-finance-form';
import {CurrencyRequestForm} from '../../../model/request-payload/caisse/currency-request-form';
import {PaiementRequestForm} from '../../../model/request-payload/caisse/paiement-form';
import {VirementRequestForm} from '../../../model/request-payload/caisse/virement-request-form';
import {ChequeResult} from '../../../model/response-payload/caisse/cheque-result';
import {CompteResult} from '../../../model/response-payload/caisse/compte-result';
import {CurrencyResult} from '../../../model/response-payload/caisse/currency-result';
import {PaiementResult} from '../../../model/response-payload/caisse/paiement-result';
import {VirementResult} from '../../../model/response-payload/caisse/virement-result';
@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  //baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-fund';
  baseUrl = 'http://localhost:8200';
  addResult: BehaviorSubject<string> = new BehaviorSubject(null);
  compteResultList: Array<CompteResult>;
  virementResultList: Array<VirementResult>;
  currencyResultList: Array<CurrencyResult>;
  paiementResultList: Array<PaiementResult>;
  chequeResultList: Array<ChequeResult>;
  parametersAddCaisse: CompteFinanceRequestForm;
  parametersAddCurrency: CurrencyRequestForm;
  parametersAddVirement: VirementRequestForm;
  parametersAddPaiement: PaiementRequestForm;
  parametersAddcheque: ChequeRequestForm;
  virementresult: VirementResult;
  wordresult: string;
  virementresultadd: VirementResult;
  paiementresult: PaiementResult;
  chequeresult: ChequeResult;
  compteresult: CompteResult;
  constructor(private http: HttpClient) {
  }
  // Compte Bancaires
  addcompte() {
    const payload = {
      ref: this.parametersAddCaisse.ref.value,
      label: this.parametersAddCaisse.label.value,
      accountType: this.parametersAddCaisse.accountType.value,
      currency: {
         uuid:  this.parametersAddCaisse.currency.value
      },
      state: this.parametersAddCaisse.state.value,
      country: this.parametersAddCaisse.country.value,
      comment: this.parametersAddCaisse.comment.value,
      initialAmount: this.parametersAddCaisse.initialAmount.value,
      accountDate: moment().toDate(),
      minimalAmount: this.parametersAddCaisse.minimalAmount.value,
      bankName: this.parametersAddCaisse.bankName.value,
      accountNumber: this.parametersAddCaisse.accountNumber.value,
      swift: this.parametersAddCaisse.swift.value,
      ownerName: this.parametersAddCaisse.ownerName.value,
      ownerAddress: this.parametersAddCaisse.ownerAddress.value,
      accountingAccount: this.parametersAddCaisse.accountingAccount.value,
      accountingAccountCode: this.parametersAddCaisse.accountingAccountCode.value,
     };
    return this.http.post(`${this.baseUrl}/bank-accounts-fund`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  deletecompte(uuid: any) {
    return this.http.delete(`${this.baseUrl}/bank-accounts-fund/${uuid}`, {
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
  getAllComptes(): Observable<any> {
    return this.http.get<Array<CompteResult>>(`${this.baseUrl}/bank-accounts-fund`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.compteResultList = response;
    }));
  }
  ModifyCaisse(currentCaisse: any) {
    return this.http.put(`${this.baseUrl}/bank-accounts-fund`, currentCaisse, {
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
  getcompte(uuid: string): Observable<any> {
    return this.http.get<CompteResult>(`${this.baseUrl}/bank-accounts-fund/${uuid}`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.compteresult = response;
    }));
  }

  // Virement
  addvirement() {
    const payload = {
      social_reason: this.parametersAddVirement.socialreason.value,
      beneficiary_accounts: [],
      origin_account: {
        uuid:  this.parametersAddVirement.compteorigin.value
      },
      transfer_date: this.parametersAddVirement.datevirement.value,
      transfer_number: this.parametersAddVirement.transfernumber.value,
    };
    this.parametersAddVirement.beneficiarys.values.forEach(item => payload.beneficiary_accounts.push(
      {
        beneficiaryName: item.beneficiaryName,
        amount: item.amount,
        object: item.description,
        beneficiaryAccount: { uuid: item.beneficiaryAccount},
      }
      )
    );
    return this.http.post(`${this.baseUrl}/bank-trasfers`, payload,
      // {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  deletevirement(uuid: any) {
    return this.http.delete(`${this.baseUrl}/bank-trasfers/${uuid}`, {
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
  getvirement(uuid: string): Observable<any> {
    return this.http.get<VirementResult>(`${this.baseUrl}/bank-trasfers${uuid}`).pipe(map(response => {
      return this.virementresult = response;
    }));
  }
  getwordfromnumber(amount: number): Observable<any> {
    return this.http.get<string>(`${this.baseUrl}/transfer-order/getwordfromnumber/${amount}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.wordresult = response;
    }));
  }
  getAllVirement(): Observable<any> {
    return this.http.get<Array<VirementResult>>(`${this.baseUrl}/bank-trasfers`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.virementResultList = response;
    }));
  }

  // Paiement
  addpaiemet() {
    const payload = {
      paymentDate: this.parametersAddPaiement.paymentDate.value,
      valueDate: this.parametersAddPaiement.valueDate.value,
      label: this.parametersAddPaiement.label.value,
      sens: this.parametersAddPaiement.sens.value,
      bankAccount: {
        uuid: this.parametersAddPaiement.bankAccount.value
      },
      amount: this.parametersAddPaiement.amount.value,
      paymentMode: this.parametersAddPaiement.paymentMode.value,
      checkNumber: '',
      project: this.parametersAddPaiement.projet.value,
      idpaiement: 0,
    };
    return this.http.post(`${this.baseUrl}/payments`, payload,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  deletepaiement(uuid: any) {
    return this.http.delete(`${this.baseUrl}/payments/${uuid}`, {
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
  getpaiement(uuid: string): Observable<any> {
    return this.http.get<PaiementResult>(`${this.baseUrl}/payments${uuid}`).pipe(map(response => {
      return this.paiementresult = response;
    }));
  }
  getAllPaiements(): Observable<any> {
    return this.http.get<Array<PaiementResult>>(`${this.baseUrl}/payments`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.paiementResultList = response;
    }));
  }

  // Cheque
  addcheque() {
    const payload = {
      check_date: this.parametersAddcheque.datecheque.value,
      check_number: this.parametersAddcheque.numcheque.value,
      transmitter: this.parametersAddcheque.transmitter.value,
      amount: this.parametersAddcheque.montant.value,
      bank_account: {
        uuid: this.parametersAddcheque.compte.value
      },
      rule: this.parametersAddcheque.reglement.value,
      payment: {
        uuid: this.parametersAddcheque.ecriture.value
      },
      idcheque: 0,
    };
    return this.http.post(`${this.baseUrl}/bank-checks`, payload,
      {headers: new HttpHeaders().set(SKIP_AUTH_INTERCEPTOR_HEADER.name, SKIP_AUTH_INTERCEPTOR_HEADER.value)}
    ).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  deletecheque(uuid: any) {
    return this.http.delete(`${this.baseUrl}/bank-checks/${uuid}`, {
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
  getcheque(uuid: string): Observable<any> {
    return this.http.get<ChequeResult>(`${this.baseUrl}/bank-checks${uuid}`).pipe(map(response => {
      return this.chequeresult = response;
    }));
  }
  getAllCheques(): Observable<any> {
    return this.http.get<Array<ChequeResult>>(`${this.baseUrl}/bank-checks`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.chequeResultList = response;
    }));
  }

  // currency
  addcurrency() {
    const payload = {
      name: this.parametersAddCurrency.name.value,
      label: this.parametersAddCurrency.label.value,
      exchange_rate: this.parametersAddCurrency.exchangeRate.value
    };
    return this.http.post(`${this.baseUrl}/currencies`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  deletecurrency(uuid: any) {
    return this.http.delete(`${this.baseUrl}/currencies/${uuid}`, {
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
  getAllCurrencies(): Observable<any> {
    return this.http.get<Array<CurrencyResult>>(`${this.baseUrl}/currencies`,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(map(response => {
      return this.currencyResultList = response;
    }));
  }
  public adaptSearchResult(data: any): any {}
}
