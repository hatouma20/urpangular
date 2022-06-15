import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {SearchFormComponent} from './form/search-form.component';
import {SearchRoutingModule} from './search-routing.module';


@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  exports: [MatAutocompleteModule, MatInputModule]
})
export class SearchModule {
}
