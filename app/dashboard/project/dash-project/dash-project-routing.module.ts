import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'list',
    component: ProjectListComponent
  },
  {
    path: 'details',
    component: ProjectDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class DashProjectRoutingModule {
}
