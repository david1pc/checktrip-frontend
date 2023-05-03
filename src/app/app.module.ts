import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/services/auth.interceptor.ts';
import { AuthenticationService } from './auth/services/authentication.service';
import { AirportCitySearchService } from './aeropuertos/services/airport-city-search.service';
import { SharedModule } from './shared/shared.module';
import { VuelosService } from './vuelos/services/vuelos.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    AuthenticationService,
    AirportCitySearchService,
    VuelosService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
