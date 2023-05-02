import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FiltroGeneralComponent } from './components/filtro-general/filtro-general.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor.ts';
import { AuthenticationService } from './services/authentication.service';
import { AirportCitySearchService } from './services/airport-city-search.service';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalElegirCiudadesComponent } from './components/modales/modal-elegir-ciudades/modal-elegir-ciudades.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarVuelosComponent } from './components/buscar-vuelos/buscar-vuelos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FiltroGeneralComponent,
    PaginaNoEncontradaComponent,
    LoginComponent,
    NavbarComponent,
    ModalElegirCiudadesComponent,
    BuscarVuelosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule 
  ],
  providers: [
    AuthenticationService,
    AirportCitySearchService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
