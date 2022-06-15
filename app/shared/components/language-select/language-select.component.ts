import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../model/language';

@Component({
  selector: 'wind-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  @Input() languages: Array<Language>;

  @Output() languageSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  get currentLanguage(): Language {
    return this.languages.find(lang => {
      if (lang.current) {
        return lang;
      }
    });
  }

  set currentLanguage(lang: Language) {
    this.languages.forEach(language => language.current = language.key === lang.key);
  }

  get languagesMinusCurrent() {
    return this.languages.filter(lang => (!lang.current) ? lang : undefined);
  }

  ngOnInit(): void {
  }

  onLanguageSelect(lang: Language) {
    this.currentLanguage = lang;
    this.languageSelected.emit(lang.key);
  }
}
