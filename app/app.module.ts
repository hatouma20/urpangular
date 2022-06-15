import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule} from '@ngneat/transloco';
import {DataTablesModule} from 'angular-datatables';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {SliderCarouselModule} from 'slider-carousel';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {FlightModule} from './flight/flight.module';
import {HomeComponent} from './home/home.component';
import {HotelModule} from './hotel/hotel.module';
import {SharedModule} from './shared/shared.module';
import {translocoLoader} from './transloco.loader';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    DataTablesModule,
    DashboardModule,
    SliderCarouselModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FlightModule,
    HotelModule,
    BrowserAnimationsModule, 
    AuthModule,
    NgbModule,
    MatNativeDateModule,
    // !environment.production ?
    //   HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {delay: 3000}) : [],
    TranslocoModule,
    SharedModule,
    MatCarouselModule,

  ],
  providers: [{
    provide: TRANSLOCO_CONFIG,
    useValue: {
      listenToLangChange: true,
      defaultLang: 'en',
      prodMode: environment.production
    } as TranslocoConfig
  },
    translocoLoader
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
