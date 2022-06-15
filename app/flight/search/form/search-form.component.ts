import {Component, OnInit} from '@angular/core';
import {from} from 'rxjs';
import {delay} from 'rxjs/operators';
import {latestsFlights} from '../../../fake/data/latest-search';
import {ILatestSearch} from '../../../shared/abstract/i-latest-search';
import {AutoCompleteSubject} from '../../../shared/components/auto-complete/auto-complete.component';
import {WindForm, WindFormElement} from '../../../shared/model/windForm';

@Component({
  selector: 'wind-flight-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public lists: Array<ILatestSearch> = latestsFlights;
  public form: WindForm;
  public tempList: any[] = [];

  constructor() {
  }

  get dataLoader() {
    return (term: string) => from([]).pipe(
      delay(3000)
    );
  }

  ngOnInit(): void {
    this.form = new WindForm([new WindFormElement('airline', '', 'text')]);
    ['1', '2', '2', '3'].forEach(element => this.tempList.push(new AutoCompleteSubject(element, element)));
  }

  public autocompleteSelected(event: any) {
    //TODO autocomplete selection logic
  }
}
