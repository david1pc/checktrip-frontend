import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
      this.authenticationService.login().subscribe({
        next: (response) => {
          this.auth_checktrip
            .loginChecktrip(value.username, value.password)
            .subscribe({
              next: (data) => {
                this.authenticationService.guardarToken(response, data);
                this.verModalExito(
                  'Login',
                  'Ha iniciado sesion correctamente',
                  '/'
                );
              },
              error: (error) => {
                this.verModal('Login', error.error);
              },
            });
        },
        error: (error) => {
          console.log('Error al iniciar sesion', error);
        },
      });
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
    this.router.navigate(['registro']);
  }
}
