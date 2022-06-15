import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {EventManagerService} from '../event/event-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastrService: ToastrService,
              private eventManager: EventManagerService) {
  }
}
