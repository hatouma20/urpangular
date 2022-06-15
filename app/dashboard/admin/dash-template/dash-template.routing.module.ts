import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTemplateComponent} from './create-document/create-template.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CreateTemplateComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class DashTemplateRoutingModule {
}
