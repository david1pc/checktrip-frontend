import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirportCitySearchService } from '../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalElegirCiudadesComponent } from '../../components/modales/modal-elegir-ciudades/modal-elegir-ciudades.component';
import { ModalAuthComponent } from '../../../../../src/app/auth/components/modal-auth/modal-auth.component';

@Component({
  selector: 'app-filtro-general',
  templateUrl: './filtro-general.component.html',
})
export class FiltroGeneralComponent implements OnInit {
  formulario: FormGroup;
  aeropuertos: any[] = [];
  yaBusco: boolean = false;

  constructor(
    private formBuider: FormBuilder,
    private services: AirportCitySearchService,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuider.group({
      keyword: ['', [Validators.required]],
    });
  }
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

  consultar() {
    if (this.formulario.valid) {
      this.yaBusco = true;
      this.services.searchslocations(this.formulario.value.keyword).subscribe({
        next: (response) => {
          this.aeropuertos = this.estructurarDatos(response.data);
        },
      });
    }
  }

  estructurarDatos(response: any[]): any[] {
    return response.map((item) => {
      let registro: any = {
        nombre: item.name,
        codigo: item.iataCode,
        ciudad: item.address.cityName,
        pais: item.address.countryName,
      };

      return registro;
    });
  }

  verCiudadesDestinos(codigoAeropuerto: string, nombreAeropuerto: string) {
    const modalRef = this.modalService.open(ModalElegirCiudadesComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      codigo: codigoAeropuerto,
      nombre: nombreAeropuerto,
    };
  }
}
