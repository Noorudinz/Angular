import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import * as fromApp from './store/app.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './auth/store/auth.effects';
import { CoreModule } from './core.module';
import { UserEffects } from './user/store/user.effects';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyComponent } from './company/company.component';
import { AgmCoreModule } from '@agm/core';
import { OsmViewComponent } from './osm-view/osm-view.component';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { BuildingsEffects } from './building-master/store/building.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PriceFactorComponent } from './price-factor/price-factor.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CompanyComponent,
    OsmViewComponent,
    PriceFactorComponent,
    EmailSettingComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, UserEffects, BuildingsEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SharedModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADGS9mCRZGa5TmtQqX1ZIU_spB-aGZKpI' //google map api key
    }),
    AngularOpenlayersModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
