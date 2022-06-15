import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../model/language';

@Component({
  selector: 'wind-language-item',
  template: `<img (click)="onLanguageSelected()" src="assets/img/flags/{{item.key}}.png"/> {{item.label}}`
})
export class LanguageItemComponent implements OnInit {

  @Input() item: Language;

  @Output('selected') selected: EventEmitter<Language> = new EventEmitter<Language>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onLanguageSelected(): void {
    this.selected.emit(this.item);
  }

}
