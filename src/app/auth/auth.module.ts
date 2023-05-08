import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ModalAuthComponent } from './components/modal-auth/modal-auth.component';
import { SharedModule } from '../shared/shared.module';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { ActualizarPasswdComponent } from './pages/actualizar-passwd/actualizar-passwd.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, ModalAuthComponent, RecuperarCuentaComponent, ActualizarPasswdComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
