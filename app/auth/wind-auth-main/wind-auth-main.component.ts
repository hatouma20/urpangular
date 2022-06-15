import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {AUTHENTICATION_FAIL, LOGIN_ATTEMPTED, REGISTER_ATTEMPTED, REGISTER_FAIL, REGISTER_SUCCESS} from '../../shared/constants/event';
import {WindForm} from '../../shared/model/windForm';
import {AuthService} from '../../shared/services/back-end/auth/auth.service';
import {EventManagerService} from '../../shared/services/event/event-manager.service';
import {EventWithContent} from '../../shared/services/event/event-with-content';
import {PartnerService} from '../../shared/services/back-end/partner/partner.service';

@Component({
  selector: 'wind-auth-main',
  templateUrl: './wind-auth-main.component.html',
  styleUrls: ['./wind-auth-main.component.scss']
})
export class WindAuthMainComponent implements OnInit {

  constructor(private authService: AuthService,
              private partnerService: PartnerService,
              private eventManager: EventManagerService,
              private logger: NGXLogger,
              private router: Router) {
  }

  ngOnInit(): void {
    this.eventManager.on(LOGIN_ATTEMPTED, (event: EventWithContent<WindForm>) => {
      this.authService.authenticate(event.content.asJson)
        .toPromise()
        .then(_ => this.router.navigateByUrl('/'))
        .catch(error => {
          this.eventManager.broadcast(AUTHENTICATION_FAIL);
          event.content.failedSubmissions++;
          this.logger.debug(error);
        });
    });
    this.eventManager.on(REGISTER_ATTEMPTED, (event: EventWithContent<any>) => {
      this.partnerService.register(event.content).subscribe(response => {
        this.eventManager.broadcast(new EventWithContent(REGISTER_SUCCESS, null));
      },
      error => {
        this.eventManager.broadcast(new EventWithContent(REGISTER_FAIL, null));
      });
    });
  }

}
