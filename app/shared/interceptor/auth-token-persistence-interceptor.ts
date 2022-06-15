import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {trackByEventId} from 'angular-calendar/modules/common/util';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap, timeout} from 'rxjs/operators';
import {AUTHENTICATION_SUCCESS} from '../constants/event';
import {AUTHORISATION_BEARER_HEADER} from '../constants/header';
import {AUTHENTICATION_KEY} from '../constants/local-storage-keys';
import {EventManagerService} from '../services/event/event-manager.service';
import {EventWithContent} from '../services/event/event-with-content';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Injectable()
export class AuthTokenPersistenceInterceptor implements HttpInterceptor {
  private finished = new BehaviorSubject(null);

  constructor(private storageService: LocalStorageService,
              private eventManager: EventManagerService,
              private logger: NGXLogger) {
  }

  // @ts-ignore
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.headers.get(AUTHORISATION_BEARER_HEADER.name)) {
          const to = event.headers.get(AUTHORISATION_BEARER_HEADER.name).replace('Bearer ', '');
      //     this.storageService.setItem(AUTHENTICATION_KEY, to).pipe(
      //       map(val => this.eventManager.broadcast(new EventWithContent(AUTHENTICATION_SUCCESS, event.body)))
      //       // map(val2 => this.logger.trace('authentication token saved'))
      //     ).subscribe(resp => this.logger.trace('authentication token saved'));
          this.finished.next(false);
          this.storageService.setItem(AUTHENTICATION_KEY, to).subscribe(resp => {this.finished.next(true); });
          this.finished.subscribe(value => {if ( value) {
            this.eventManager.broadcast(new EventWithContent(AUTHENTICATION_SUCCESS, event.body));
            this.logger.trace('authentication token saved');
         } });
        }
      })
    );
  }
}
