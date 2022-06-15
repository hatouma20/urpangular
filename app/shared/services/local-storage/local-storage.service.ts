import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * handles local storage operations
 */
export class LocalStorageService {

  constructor(private storage: StorageMap) {
  }

  /**
   * gets item by key
   * @param key
   */
  getItem(key: string): Observable<unknown> {
    return this.storage.get(key);
  }
  // getItem(key: string) {
  //   localStorage.get(key);
  // }

  /**
   * saves item value by key
   * @param key
   * @param value
   */
  setItem(key: string, value: any): Observable<undefined> {
    return this.storage.set(key, value);
  }

  /**
   * deletes item by key
   * @param key
   */
  deleteItem(key: string): Observable<undefined> {
    return this.storage.delete(key);
  }

  /**
   * clears storage
   */
  clear(): Observable<undefined> {
    return this.storage.clear();
  }
}
