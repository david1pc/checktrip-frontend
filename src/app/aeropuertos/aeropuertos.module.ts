import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AeropuertosRoutingModule } from './aeropuertos-routing.module';
import { BuscarVuelosComponent } from './pages/buscar-vuelos/buscar-vuelos.component';
import { FiltroGeneralComponent } from './pages/filtro-general/filtro-general.component';
import { ModalElegirCiudadesComponent } from './components/modales/modal-elegir-ciudades/modal-elegir-ciudades.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuscarVuelosComponent,
    FiltroGeneralComponent,
    ModalElegirCiudadesComponent,
  ],
  imports: [
    CommonModule,
    AeropuertosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AeropuertosModule {}
