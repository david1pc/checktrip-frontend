import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarVuelosComponent } from '../aeropuertos/pages/buscar-vuelos/buscar-vuelos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BuscarVuelosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VuelosRoutingModule {}
