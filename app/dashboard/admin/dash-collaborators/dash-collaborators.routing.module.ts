import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollaboratorsComponent} from './collaborators/collaborators.component';
import {TeamsComponent} from './teams/teams.component';
import {GestionteamsComponent} from './teams/gestionteams.component/gestionteams.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CollaboratorsComponent
  },
  {
    path: 'team',
    component: TeamsComponent
  },
  {
    path: 'teams',
    component: GestionteamsComponent
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
export class DashCollaboratorsRoutingModule {
}
