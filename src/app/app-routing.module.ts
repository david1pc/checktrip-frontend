import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FiltroGeneralComponent } from './components/filtro-general/filtro-general.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { LoginComponent } from './components/login/login.component';
import { BuscarVuelosComponent } from './components/buscar-vuelos/buscar-vuelos.component';

const routes: Routes = [
  {
    path: '', redirectTo:  'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'filtros',
    component: FiltroGeneralComponent
  },
  {
    path: 'buscarVuelos/:param1/:param2/:param3/:param4',
    component: BuscarVuelosComponent
  },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
