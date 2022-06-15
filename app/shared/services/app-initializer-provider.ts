import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {APPLICATION_BOOTSTRAPPED} from '../constants/event';
import {AUTHENTICATION_KEY} from '../constants/local-storage-keys';
import {Token} from '../model/response-payload/token';
import {AuthService} from './back-end/auth/auth.service';
import {EventManagerService} from './event/event-manager.service';
import {LocalStorageService} from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerProvider {

  constructor(private eventManager: EventManagerService,
              private storageService: LocalStorageService,
              private authService: AuthService,
              private logger: NGXLogger) {

  }

  hookToAppInitEvent() {
    this.eventManager.on(APPLICATION_BOOTSTRAPPED, (data) => {
      this.storageService.getItem(AUTHENTICATION_KEY).subscribe((token: string) => {
        this.authService.authenticationToken = new Token(token);
        this.logger.trace('app initialized');
      });
    });
  }
}
