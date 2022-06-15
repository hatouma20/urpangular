import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatPaginatorModule, MatTableModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AdminEmployeeModule} from './employee.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminEmployeeModule,
    NgMultiSelectDropDownModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class EmployeeModule {
}
