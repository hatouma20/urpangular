import {Injectable} from '@angular/core';
import {SEARCH_INITIATED, SEARCH_TERMINATED} from '../../constants/event';
import {EventManagerService} from '../event/event-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private eventManager: EventManagerService) {

    this.eventManager.on(SEARCH_INITIATED, loader => this.toggleOnLoader(loader));

    this.eventManager.on(SEARCH_TERMINATED, loader => this.toggleOnLoader(loader));
  }

  toggleOnLoader(loader: string) {
    // TODO toggle loader
  }

  toggleOffLoader(loader: string) {
    // TODO untoggle loader
  }
}
