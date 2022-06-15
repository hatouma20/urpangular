import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {APPLICATION_BOOTSTRAPPED, AUTHENTICATION_SUCCESS} from './shared/constants/event';
import {CollaboratorModel} from './shared/model/response-payload/collaborators/collaborator-model';
import {CollaboratorService} from './shared/services/back-end/collaborator/collaborator.service';
import {EventManagerService} from './shared/services/event/event-manager.service';

@Component({
  selector: 'wind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'monorepo';
  public authenticated: boolean = false;
  collaborator: CollaboratorModel;
  //   = new CollaboratorModel(
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: moment().toDate(), dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   {value: '', dirty: false, class: '', error: ''},
  //   true
  // );
  constructor(private eventManager: EventManagerService,
              private sirhSservice: CollaboratorService,
              private logger: NGXLogger) {
  }

  public ngOnInit(): void {
    this.eventManager.broadcast(APPLICATION_BOOTSTRAPPED);
    this.eventManager.on(AUTHENTICATION_SUCCESS, (payload => {
      if (payload != null) {
        this.sirhSservice.getCollaborator(payload.content.uuid).subscribe(response =>
          this.collaborator = response
        );
        this.authenticated = true;
      }
      this.logger.trace(payload);
    }));
  }
}
