import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {FeatherModule} from 'angular-feather';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {ToastrModule} from 'ngx-toastr';
import {AutoCompleteComponent} from './components/auto-complete/auto-complete.component';
import {CardPaymentComponent} from './components/facture-components/card-payment/card-payment.component';
import {ChequePaymentComponent} from './components/facture-components/cheque-payment/cheque-payment.component';
import {EspecePaymentComponent} from './components/facture-components/espece-payment/espece-payment.component';
import {Retenue_sourceComponent} from './components/facture-components/retenue_source/retenue_source.component';
import {TraitePaymentComponent} from './components/facture-components/traite-payment/traite-payment.component';
import {VirementPaymentComponent} from './components/facture-components/virement-payment/virement-payment.component';
import {LanguageItemComponent} from './components/language-select/language-item.component';
import {LanguageSelectComponent} from './components/language-select/language-select.component';
import {LatestSearchComponent} from './components/latest-search/latest-search.component';
import {WindFooterComponent} from './components/layout/wind-footer/wind-footer.component';
import {WindHeaderComponent} from './components/layout/wind-header/wind-header.component';
import {WindMainComponent} from './components/layout/wind-main/wind-main.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SliderwithindicatorsComponent} from './components/sliderwithindicators/sliderwithindicators.component';
import {SliderwithoutindicatorsComponent} from './components/sliderwithoutindicators/sliderwithoutindicators.component';
import {AuthTokenInjectorInterceptor} from './interceptor/auth-token-injector-interceptor';
import {AuthTokenPersistenceInterceptor} from './interceptor/auth-token-persistence-interceptor';
import {AppInitializerProvider} from './services/app-initializer-provider';
import { Camera, Heart, Github, ChevronDown, Trash2, Edit } from 'angular-feather/icons';

export function appInitializerFactory(provider: AppInitializerProvider) {
  return () => provider.hookToAppInitEvent();
}
const icons = {
  Camera,
  Heart,
  Github,
  Trash2,
  Edit,
  ChevronDown
};
@NgModule({
  declarations: [ChequePaymentComponent, SliderwithoutindicatorsComponent,
    SliderwithindicatorsComponent, WindHeaderComponent, WindFooterComponent,
    WindMainComponent, NotFoundComponent, LatestSearchComponent, LanguageSelectComponent,
    LanguageItemComponent, AutoCompleteComponent, EspecePaymentComponent, VirementPaymentComponent,
    TraitePaymentComponent, Retenue_sourceComponent, CardPaymentComponent],
  exports: [
    FeatherModule,
    LatestSearchComponent,
    AutoCompleteComponent,
    SliderwithindicatorsComponent,
    SliderwithoutindicatorsComponent,
    ChequePaymentComponent,
    EspecePaymentComponent,
    EspecePaymentComponent,
    EspecePaymentComponent,
    TraitePaymentComponent,
    VirementPaymentComponent,
    Retenue_sourceComponent,
    CardPaymentComponent
  ],
  imports: [
    FeatherModule.pick(icons),
    CommonModule,
    RouterModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE}),
    FormsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule,
    FeatherModule
  ],
  providers: [
    AppInitializerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenPersistenceInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInjectorInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
}
