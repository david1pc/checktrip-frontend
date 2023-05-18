import { Component, OnInit } from '@angular/core';
import { VuelosService } from '../../services/vuelos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Datum } from '../../interfaces/vuelos.interface';
import { ModalAuthComponent } from 'src/app/auth/components/modal-auth/modal-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  termino_origen: string = '';
  termino_destino: string = '';
  ciudades_origen: Datum[] = [];
  ciudades_destino: Datum[] = [];

  ciudadOrigen: string = '';
  ciudadDestino: string = '';
  fecha_salida!: Date;
  fecha_vuelta!: Date;
  cantidadAdultos: number = 1;
  cantidadInfantes: number = 0;
  travelClass: string = '';
  tipoVuelo: string = '';

  formulario: FormGroup;

  busqueda_origen: string = '';
  busqueda_destino: string = '';

  constructor(
    private vuelosService: VuelosService,
    private route: ActivatedRoute,
    private formBuider: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.formulario = this.formBuider.group({
      ciudadOrigen: ['', []],
      ciudadDestino: ['', []],
      fecha_salida: ['', [Validators.required]],
      fecha_vuelta: ['', []],
      cantidadAdultos: [1, [Validators.required]],
      cantidadInfantes: [0, []],
      tipoVuelo: ['', [Validators.required]],
      travelClass: ['', [Validators.required]],
      vueloDirecto: ['', []],
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
    this.formulario.controls['vueloDirecto'].setValue(true);
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

  cambiarTipo(event: any) {
    const valor = event.target.value;
    this.formulario.controls['tipoVuelo'].setValue(valor);
  }

  validarTipoVuelo() {
    if (this.formulario.controls['tipoVuelo'].value == 'idavuelta') {
      return true;
    } else {
      return false;
    }
  }

  buscarCiudadOrigen(termino: string) {
    this.ciudades_origen = [];
    this.termino_origen = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_origen).subscribe({
      next: (busqueda) => {
        busqueda.data.forEach((ciudad) => {
          if (ciudad.iataCode) {
            this.ciudades_origen.push(ciudad);
          }
        });
      },
      error: () => {},
    });
  }

  seleccionar_ciudad_origen(ciudad: string) {
    const iata_code = ciudad.split('(')[1].replace(')', '');
    this.ciudadOrigen = iata_code;
    this.busqueda_origen = ciudad;
  }

  seleccionar_ciudad_destino(ciudad: string) {
    const iata_code = ciudad.split('(')[1].replace(')', '');
    this.ciudadDestino = iata_code;
    this.busqueda_destino = ciudad;
  }

  buscarCiudadDestino(termino: string) {
    this.ciudades_destino = [];
    this.termino_destino = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_destino).subscribe({
      next: (busqueda) => {
        busqueda.data.forEach((ciudad) => {
          if (ciudad.iataCode) {
            this.ciudades_destino.push(ciudad);
          }
        });
      },
      error: () => {},
    });
  }

  buscarVuelo() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      const tipoVuelo = this.formulario.controls['tipoVuelo'].value;
      if (tipoVuelo == 'ida') {
        this.establecerValoresSesion();
        this.router
          .navigate([
            '/vuelos/ofertas',
            this.ciudadOrigen,
            this.ciudadDestino,
            value.fecha_salida,
            value.cantidadAdultos,
            value.cantidadInfantes,
            value.travelClass,
            value.vueloDirecto,
          ])
          .then(() => {})
          .catch(() => {});
      } else {
        this.establecerValoresSesion();
        this.router
          .navigate([
            '/vuelos/ofertas',
            this.ciudadOrigen,
            this.ciudadDestino,
            value.fecha_salida,
            value.fecha_vuelta,
            value.cantidadAdultos,
            value.cantidadInfantes,
            value.travelClass,
            value.vueloDirecto,
          ])
          .then(() => {})
          .catch(() => {});
      }
    }
  }

  establecerValoresSesion() {
    sessionStorage.setItem('busqueda_origen', this.busqueda_origen);
    sessionStorage.setItem('busqueda_destino', this.busqueda_destino);
  }
}
