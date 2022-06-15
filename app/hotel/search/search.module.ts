import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SearchFormComponent} from './form/search-form.component';
import {SearchRoutingModule} from './search-routing.module';


@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule {
}
