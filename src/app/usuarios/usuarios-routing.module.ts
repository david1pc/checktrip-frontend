import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinerariosComponent } from './pages/itinerarios/itinerarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'itinerarios',
        component: ItinerariosComponent,
      },
      {
        path: '**',
        redirectTo: 'itinerarios',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
