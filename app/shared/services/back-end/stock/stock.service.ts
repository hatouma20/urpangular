import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import {SKIP_AUTH_INTERCEPTOR_HEADER} from '../../../constants/header';
import {StockAttributeForm} from '../../../model/request-payload/stock/stock-attribut-form';
import {StockRequestForm} from '../../../model/request-payload/stock/stock-request-form';
import {AddattributeResult} from '../../../model/response-payload/stock/add-attribute-result';
import {AddstockResult} from '../../../model/response-payload/stock/add-stock-result';
import {ProductsAttributesResult} from '../../../model/response-payload/stock/products-attributes-result';
import {ServicesAttributesResult} from '../../../model/response-payload/stock/services-attributes-result';
import {AddDepotResult} from '../../../model/response-payload/stock/add-depot-result';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  attributesResultList: Array<AddattributeResult>;
  depotResultList: Array<AddDepotResult>;
  stockResultList: Array<AddstockResult>;
  productsattributesResultList: Array<ProductsAttributesResult>;
  servicesattributesResultList: Array<ServicesAttributesResult>;
  parametersAdd: StockRequestForm;
  uuid: string;
  parametersAttributesAdd: StockAttributeForm;
  baseUrl = 'http://ns3012518.ip-149-202-74.eu:8762/wind-stock/stock';


  addResult: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }

  // Products
  addproduct() {
    const payload = {
      description: this.parametersAdd.description.value,
      image: this.parametersAdd.image.value,
      isActive: this.parametersAdd.isActive.value,
      name: this.parametersAdd.nom.value,
      priceIn: this.parametersAdd.priceIn.value,
      priceOut: this.parametersAdd.priceOut.value,
      sku: '',
      stock: this.parametersAdd.stock.value,
      supplier: this.parametersAdd.supplier.value
    };
    return this.http.post(`${this.baseUrl}/products/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }

  createstock(payload: any) {
    return this.http.post(`${this.baseUrl}/products/create`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Array<AddstockResult>>(`${this.baseUrl}/products/list`).pipe(map(response => {
      return this.stockResultList = response;
    }));
  }
  getAllProductswithattributes(): Observable<any> {
    return this.http.get<Array<ProductsAttributesResult>>(`${this.baseUrl}/productAttributeValue/list`).pipe(map(response => {
      return this.productsattributesResultList = response;
    }));
  }
  deleteproduct(uuid: any) {
    return this.http.delete(`${this.baseUrl}/products/delete/${uuid}`, {
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
  addproductwithattributes() {
      const payload = {
        attributes: [],
        booleanValue: null,
        dateValue: null,
        numericValue: null,
        products: [],
        stringValue: null,
      };
      payload.products.push({
        description: this.parametersAdd.description.value,
        id_product: 0,
        image: this.parametersAdd.image.value,
        isActive: this.parametersAdd.isActive.value,
        name: this.parametersAdd.nom.value,
        priceIn: this.parametersAdd.priceIn.value,
        priceOut: this.parametersAdd.priceOut.value,
        sku: '',
        stock: this.parametersAdd.stock.value,
        supplier: this.parametersAdd.supplier.value,
      });
      this.parametersAdd.attributes.values.forEach(attribute => payload.attributes.push(
        {
          description: attribute.description,
          id_attribute: attribute.idattribute,
          label: attribute.label,
          status: attribute.status,
          uuid: attribute.uuid,
          valueType: attribute.typevalue,
        }
        )
      );
      this.parametersAdd.attributes.values.forEach(attribute => {
        switch (attribute.typevalue.value) {
            case 'NUMERIC':
            payload.numericValue = attribute.typevalue ;
            break;
           case 'BOOLEAN':
            payload.booleanValue = true ;
            break;
          case 'DATE':
            payload.dateValue = attribute.typevalue;
            break;
          case 'STRING':
            payload.stringValue = attribute.typevalue ;
            break;
          default:
            console.log('No such type exists!');
            break;
        }
      });
      return this.http.post(`${this.baseUrl}/productAttributeValue`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }

//start depot
  createdepot(payload: any) {
    return this.http.post(`${this.baseUrl}/warehouses`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getAlldepot(): Observable<any> {
    return this.http.get<Array<AddDepotResult>>(`${this.baseUrl}/warehouses/list`,
    ).pipe(map(response => {
      console.log(response);
      return this.depotResultList = response;
    }));
  }

  update(currentTeams: any) {
    return this.http.put(`${this.baseUrl}/warehouses/update`, currentTeams, {
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

  deletedepot(uuid: any) {
    return this.http.delete(`${this.baseUrl}/warehouses/delete/${uuid}`
    ).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  // end depot



  // Attributes
  addattributes() {
    const payload = {
      description: this.parametersAttributesAdd.description.value,
      label: this.parametersAttributesAdd.label.value,
      status: this.parametersAttributesAdd.status.value,
      valueType: this.parametersAttributesAdd.typevalue.value
    };
    return this.http.post(`${this.baseUrl}/attributes/create`, payload,
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
  deleteattributestock(uuid: any) {
    return this.http.delete(`${this.baseUrl}/attributes/delete/${uuid}`
    ).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getAllAttributes(): Observable<any> {
    return this.http.get<Array<AddattributeResult>>(`${this.baseUrl}/attributes/list`,
      ).pipe(map(response => {
      return this.attributesResultList = response;
    }));
  }






  // Services
  getAllServices(): Observable<any> {
    return this.http.get<Array<AddstockResult>>(`${this.baseUrl}/services/list`).pipe(map(response => {
      return this.stockResultList = response;
    }));
  }
  addService() {
    const payload = {
      description: this.parametersAdd.description.value,
      image: this.parametersAdd.image.value,
      isActive: this.parametersAdd.isActive.value,
      name: this.parametersAdd.nom.value,
      priceOut: this.parametersAdd.priceOut.value,
      sku: ''
    };
    return this.http.post(`${this.baseUrl}/services`, payload).pipe(
      timeout(60000),
      catchError((e, c) => {
        return []; // only for catch error to work, it requires a return of array, object..
      }),
      map((response: any) => {
        return this.addResult.next(this.adaptSearchResult(response));
      })
    );
  }
  addServicewithattributes() {
    const payload = {
      attributes: [],
      booleanValue: null,
      dateValue: null,
      numericValue: null,
      services: [],
      stringValue: null
    };
    payload.services.push({
      description: this.parametersAdd.description.value,
      id_product: 0,
      image: this.parametersAdd.image.value,
      isActive: this.parametersAdd.isActive.value,
      name: this.parametersAdd.nom.value,
      priceIn: this.parametersAdd.priceIn.value,
      priceOut: this.parametersAdd.priceOut.value,
      sku: '',
      stock: this.parametersAdd.stock.value,
      supplier: this.parametersAdd.supplier.value,
    });
    this.parametersAdd.attributes.values.forEach(attribute => payload.attributes.push(
      {
        description: attribute.description,
        id_attribute: attribute.idattribute,
        label: attribute.label,
        status: attribute.status,
        uuid: attribute.uuid,
        valueType: attribute.typevalue,
      }
      )
    );
    return this.http.post(`${this.baseUrl}/servicesAttributeValue`, payload).pipe(
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
  deleteservice(uuid: any) {
    return this.http.delete(`${this.baseUrl}/services/delete/${uuid}`, {
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
  getAllServiceswithattributes(): Observable<any> {
    return this.http.get<Array<ServicesAttributesResult>>(`${this.baseUrl}/servicesAttributeValue/list`).pipe(map(response => {
      return this.servicesattributesResultList = response;
    }));
  }
  public adaptSearchResult(data: any): any {}
}

