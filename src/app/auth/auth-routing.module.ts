import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { ActualizarPasswdComponent } from './pages/actualizar-passwd/actualizar-passwd.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'recuperacion',
        component: RecuperarCuentaComponent,
      },
      {
        path: 'actualizacion-passwd',
        component: ActualizarPasswdComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
