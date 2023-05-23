import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ItinerariosComponent } from './pages/itinerarios/itinerarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SharedModule } from '../../../src/app/shared/shared.module';

@NgModule({
  declarations: [ItinerariosComponent, PerfilComponent],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule],
})
export class UsuariosModule {}
