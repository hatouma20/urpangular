import {Component, HostListener, OnInit} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {NGXLogger} from 'ngx-logger';
import {LANGUAGE_ARRAY} from '../../../../fake/data/languages';
import {AUTHENTICATION_SUCCESS} from '../../../constants/event';
import {Language} from '../../../model/language';
import {CollaboratorService} from '../../../services/back-end/collaborator/collaborator.service';
import {EventManagerService} from '../../../services/event/event-manager.service';

@Component({
  selector: 'wind-header',
  templateUrl: './wind-header.component.html',
  styleUrls: ['./wind-header.component.scss']
})
export class WindHeaderComponent implements OnInit {
  public languages: Array<Language> = LANGUAGE_ARRAY;
  public authenticated: boolean = false;

  constructor(private translocoService: TranslocoService,
              private eventManager: EventManagerService,
              private logger: NGXLogger,
              private sirhSservice: CollaboratorService) {
  }

  ngOnInit(): void {
    this.eventManager.on(AUTHENTICATION_SUCCESS, (payload => {
      if (payload != null) {
        this.sirhSservice.getCollaborator(payload.uuid).subscribe();
        this.authenticated = true;
      }
      this.logger.trace(payload);
    }));
  }

  public onLanguageSelect(language: string) {
    this.translocoService.setActiveLang(language);
    this.logger.trace(`set language to ${language}`);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event) {
    const element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }
}
