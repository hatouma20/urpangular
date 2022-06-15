import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {WindFormElement} from '../../model/windForm';

export class AutoCompleteSubject {
  constructor(public label: string, public value: any) {
  }
}

@Component({
  selector: 'wind-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  @Input() formElement: WindFormElement;
  @Input() searchLength: number = 3;
  @Input() options: AutoCompleteSubject[] = [];
  @Input() dataLoader: (term: string) => Observable<any[]>;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  options$: AutoCompleteSubject[];
  public loading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.options$ = this.options;
  }

  public filter() {
    if (!(this.formElement.asFormControl.value === '') && this.formElement.asFormControl.value.length >= this.searchLength) {
      this.options = this.options$.filter(element => element.label.includes(this.formElement.asFormControl.value));
      if (!this.options.length) {
        this.loading = true;
        this.dataLoader(this.formElement.asFormControl.value).subscribe(
          data => {
            return this.options$ = this.options = data;
          },
          error => {
            return this.options$ = this.options = [];
          },
          () => {
            return this.loading = false;
          }
        );
      }
    }
  }

  onSelected(subject: AutoCompleteSubject): void {
    this.selected.emit(subject);
  }
}
