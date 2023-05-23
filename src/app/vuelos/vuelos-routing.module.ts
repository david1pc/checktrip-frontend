import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ResultadosVuelosComponent } from './pages/resultados-vuelos/resultados-vuelos.component';
import { ResultadoVuelosIdaVueltaComponent } from './pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component';
import { HistorialVuelosComponent } from './pages/historial-vuelos/historial-vuelos.component';
import { DetalleHistorialComponent } from './pages/detalle-historial/detalle-historial.component';

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
      {
        path: 'ofertas/:origen/:destino/:salida/:vuelta/:adultos/:infantes/:clase/:vueloDirecto',
        component: ResultadoVuelosIdaVueltaComponent,
      },
      {
        path: 'historial',
        component: HistorialVuelosComponent,
      },
      {
        path: 'detalle_historial_vuelos/:id',
        component: DetalleHistorialComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VuelosRoutingModule {}
