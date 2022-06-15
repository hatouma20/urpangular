import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightMainComponent} from '../flight/fligt-main/flight-main.component';
import {AuthorizedDash} from '../shared/guard/authorized-dash';
import {AuthorizedGuard} from '../shared/guard/authorized.guard';
import {DashMainComponent} from './dash-main/dash-main.component';


const ROUTES: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthorizedGuard],
    component: DashMainComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'admin',

        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'fournisseur',
        loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
      },
      {
        path: 'caisse',
        loadChildren: () => import('./caisse/caisse.module').then(m => m.CaisseModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  entryComponents: [FlightMainComponent]
})
export class DashboardRoutingModule {
}
