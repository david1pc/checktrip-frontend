import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarVuelosComponent } from './pages/buscar-vuelos/buscar-vuelos.component';
import { FiltroGeneralComponent } from './pages/filtro-general/filtro-general.component';

const routes: Routes = [
  {
    path: '',
    component: FiltroGeneralComponent,
  },
  {
    path: 'busqueda/:param1/:param2/:param3/:param4',
    component: BuscarVuelosComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AeropuertosRoutingModule {}
