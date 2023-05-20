import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formulario: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private auth_checktrip: AuthChecktripService,
    private router: Router,
    private formBuider: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuider.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      const amadeusLogin = this.authenticationService.login();
      const checktripLogin = this.auth_checktrip.loginChecktrip(
        value.username,
        value.password
      );
      let tokenAmadeus: any = '';
      amadeusLogin
        .pipe(
          switchMap((data) => {
            tokenAmadeus = data;
            return checktripLogin;
          })
        )
        .subscribe({
          next: (resultado) => {
            this.authenticationService.guardarToken(tokenAmadeus, resultado);
            this.verModalExito(
              'Login',
              'Ha iniciado sesion correctamente',
              '/'
            );
          },
          error: (error) => {
            this.verModalError(error);
          },
        });
    }
  }

  verModalError(error: any) {
    if (error.status == 426) {
      this.verModalExito(
        'Login',
        'Debe actualizar la contraseña',
        'auth/actualizacion-passwd'
      );
    } else {
      this.verModal('Login', 'El username o contraseña es incorrecto');
    }
  }

  verModal(titulo: string, descripcion: string) {
    const modalRef = this.modalService.open(ModalAuthComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      titulo: titulo,
      descripcion: descripcion,
    };
  }

  verModalExito(titulo: string, descripcion: string, navegacion: string) {
    const modalRef = this.modalService.open(ModalAuthComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      titulo: titulo,
      descripcion: descripcion,
      navegacion: navegacion,
    };
  }

  registrarse() {
    this.router
      .navigate(['registro'])
      .then(() => {})
      .catch(() => {});
  }
}
