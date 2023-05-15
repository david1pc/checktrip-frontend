import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ResultadosVuelosComponent } from './pages/resultados-vuelos/resultados-vuelos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PrincipalComponent,
      },
      {
        path: 'ofertas/:origen/:destino/:salida/:adultos/:infantes/:clase/:vueloDirecto',
        component: ResultadosVuelosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VuelosRoutingModule {}
