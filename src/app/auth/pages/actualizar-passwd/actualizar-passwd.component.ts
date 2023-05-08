import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';

@Component({
  selector: 'app-actualizar-passwd',
  templateUrl: './actualizar-passwd.component.html',
  styleUrls: ['./actualizar-passwd.component.css'],
})
export class ActualizarPasswdComponent {
  formulario: FormGroup;
  constructor(
    private auth_checktrip: AuthChecktripService,
    private router: Router,
    private formBuider: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuider.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  actualizar_cuenta() {
    if (this.formulario.valid) {
      let value = this.formulario.value;
      this.auth_checktrip
        .restaurarPasswordCuenta(
          value.username,
          value.password,
          value.newPassword
        )
        .subscribe({
          next: (resp) => {
            this.verModalExito(
              'Actualización de cuenta',
              resp.descripcion,
              'auth/login'
            );
          },
          error: (error) => {
            this.verModal('Actualización de cuenta', error.error);
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
}
