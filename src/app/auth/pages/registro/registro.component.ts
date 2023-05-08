import { Component } from '@angular/core';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRequest } from '../../interfaces/auth.interface';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  formulario: FormGroup;
  texto_fecha: string = 'Selecciona la fecha de nacimiento';
  constructor(
    private auth_checktrip: AuthChecktripService,
    private router: Router,
    private formBuider: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuider.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fecha_nacimiento: ['', []],
      condiciones: ['', [Validators.required]],
    });
  }

  registrarCuenta() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const value = this.formulario.value;
    const datos_cliente: ClientRequest = {
      person: {
        nombres: value.nombres,
        apellidos: value.apellidos,
        correo: value.correo,
        fecha_nacimiento: value.fecha_nacimiento,
        password: value.password,
        username: value.username,
      },
    };
    this.auth_checktrip.registroChecktrip(datos_cliente).subscribe({
      next: (respuesta: any) => {
        this.verModalExito(
          'Registro de cuenta',
          'Se ha creado la cuenta con exito',
          'auth/login'
        );
      },
      error: (error: any) => {
        console.log(error);
        this.verModal('Registro de cuenta', error.error.detail);
      },
    });
  }

  campoEsValido(campo: string) {
    return (
      this.formulario.controls[campo].errors &&
      this.formulario.controls[campo].touched
    );
  }

  campoEsValidoCondiciones(campo: string) {
    return (
      !this.formulario.controls[campo].value &&
      this.formulario.controls[campo].touched
    );
  }

  cambiarCondiciones() {
    if (this.formulario.value.condiciones) {
      this.formulario.controls['condiciones'].setValue(false);
    } else {
      this.formulario.controls['condiciones'].setValue(true);
    }
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
}
