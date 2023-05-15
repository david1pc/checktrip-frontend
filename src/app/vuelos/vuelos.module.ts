import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { CiudadInputComponent } from './components/ciudad-input/ciudad-input.component';
import { CiudadDestinoInputComponent } from './components/ciudad-destino-input/ciudad-destino-input.component';
import { ResultadosVuelosComponent } from './pages/resultados-vuelos/resultados-vuelos.component';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalViajeComponent } from './components/modal-viaje/modal-viaje.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    CiudadInputComponent,
    CiudadDestinoInputComponent,
    ResultadosVuelosComponent,
    ModalViajeComponent,
  ],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgBootstrapModule,
    MaterialModule,
    NgxPaginationModule,
  ],
})
export class VuelosModule {}
