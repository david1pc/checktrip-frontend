import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ItinerariosComponent } from './pages/itinerarios/itinerarios.component';
import { SharedModule } from '../../../src/app/shared/shared.module';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ItinerariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    NgBootstrapModule,
    MaterialModule,
    NgxPaginationModule,
  ],
})
export class UsuariosModule {}
