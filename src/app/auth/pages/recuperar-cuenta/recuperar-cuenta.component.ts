import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css'],
})
export class RecuperarCuentaComponent {
  formulario: FormGroup;
  constructor(
    private auth_checktrip: AuthChecktripService,
    private router: Router,
    private formBuider: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuider.group({
      correo: ['', [Validators.required]],
    });
  }

  recuperarCuenta() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      this.auth_checktrip.recuperacionCuenta(value.correo).subscribe({
        next: (resp) => {
          this.verModalExito(
            'Recuperación de cuenta',
            resp.descripcion,
            'auth/login'
          );
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
    this.router
      .navigate(['registro'])
      .then(() => {})
      .catch(() => {});
  }
}
