import { Component, OnInit } from '@angular/core';
import { ModalAuthComponent } from 'src/app/auth/components/modal-auth/modal-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('username')) {
      this.verModal(
        'Vuelos',
        'Debe iniciar sesion para continuar',
        'auth/login'
      );
    }
  }

  verModal(titulo: string, descripcion: string, navegacion: string) {
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
