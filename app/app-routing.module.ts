// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WindMainComponent} from './shared/components/layout/wind-main/wind-main.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthorizedDash} from './shared/guard/authorized-dash';
import {AuthorizedGuard} from './shared/guard/authorized.guard';


// @ts-ignore
const ROUTES: Routes = [
  {
    path: '',
    component: WindMainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'flight',
        loadChildren: () => import('./flight/flight.module').then(m => m.FlightModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'affect-module',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./affect-module/affect-module.module').then(m => m.AffectModulesModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
