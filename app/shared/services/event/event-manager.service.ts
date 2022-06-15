import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';
import {EventWithContent} from './event-with-content';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  private observable: Observable<any>;
  private observer: Observer<any>;

  constructor() {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    }).pipe(share());
  }

  on(eventName: string, callback: any): Subscription {
    return this.observable
      .pipe(
        filter((event: EventWithContent<any> | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: EventWithContent<any> | string) => {
          if (typeof event !== 'string') {
            return event;
          }
        })
      ).subscribe(callback);
  }

  broadcast(event: EventWithContent<any> | string) {
    if (this.observer) {
      this.observer.next(event);
    }
  }
}
