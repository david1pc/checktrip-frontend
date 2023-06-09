import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VuelosService } from '../../services/vuelos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Busqueda, Datum } from '../../interfaces/vuelos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-vuelos',
  templateUrl: './busqueda-vuelos.component.html',
  styleUrls: ['./busqueda-vuelos.component.css'],
})
export class BusquedaVuelosComponent {
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

  @Input() formulario: FormGroup;
  busqueda_origen: string = '';
  busqueda_destino: string = '';

  constructor(
    private vuelosService: VuelosService,
    private formBuider: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuider.group({
      ciudadOrigen: ['', []],
      ciudadDestino: ['', []],
      fecha_salida: ['', [Validators.required]],
      fecha_vuelta: ['', []],
      cantidadAdultos: [
        1,
        [Validators.required, Validators.max(8), Validators.min(1)],
      ],
      cantidadInfantes: [0, []],
      tipoVuelo: ['', [Validators.required]],
      travelClass: ['', [Validators.required]],
      vueloDirecto: ['', []],
    });
  }

  ngOnInit(): void {
    this.busqueda_origen = sessionStorage.getItem('busqueda_origen') ?? '';
    this.busqueda_destino = sessionStorage.getItem('busqueda_destino') ?? '';
    this.seleccionar_ciudad_origen(this.busqueda_origen);
    this.seleccionar_ciudad_destino(this.busqueda_destino);
  }

  cantidadEsValida(campo: string) {
    return (
      !Number.isInteger(this.formulario.controls[campo].value) ||
      this.formulario.controls[campo].value < 0
    );
  }

  fechaEsValida(campo: string) {
    const currentDate = new Date();
    const fecha = new Date(this.formulario.controls[campo].value);
    let currentDateDays =
      currentDate.getFullYear() * 365 +
      currentDate.getMonth() * 30 +
      currentDate.getDate() -
      1;
    let fechaDays =
      fecha.getFullYear() * 365 + fecha.getMonth() * 30 + fecha.getDate();
    return fechaDays < currentDateDays;
  }

  fechasSonValidas() {
    if (this.formulario.controls['tipoVuelo'].value == 'idavuelta') {
      return (
        this.formulario.controls['fecha_salida'].value >
        this.formulario.controls['fecha_vuelta'].value
      );
    } else {
      return false;
    }
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
        this.asignarCiudades(busqueda, this.ciudades_origen);
      },
      error: () => {},
    });
  }

  asignarCiudades(busqueda: Busqueda, ciudades: Datum[]) {
    busqueda.data.forEach((ciudad) => {
      if (ciudad.iataCode) {
        ciudades.push(ciudad);
      }
    });
  }

  seleccionar_ciudad_origen(ciudad: string) {
    if (ciudad) {
      const iata_code = ciudad.split('(')[1].replace(')', '');
      this.ciudadOrigen = iata_code;
      this.busqueda_origen = ciudad;
    }
  }

  seleccionar_ciudad_destino(ciudad: string) {
    if (ciudad) {
      const iata_code = ciudad.split('(')[1].replace(')', '');
      this.ciudadDestino = iata_code;
      this.busqueda_destino = ciudad;
    }
  }

  buscarCiudadDestino(termino: string) {
    this.ciudades_destino = [];
    this.termino_destino = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_destino).subscribe({
      next: (busqueda) => {
        this.asignarCiudades(busqueda, this.ciudades_destino);
      },
      error: () => {},
    });
  }

  establecerValoresSesion() {
    sessionStorage.setItem('busqueda_origen', this.busqueda_origen);
    sessionStorage.setItem('busqueda_destino', this.busqueda_destino);
  }

  verModalWarning(mensaje: string) {
    Swal.fire({
      title: 'Busqueda de vuelo',
      text: mensaje,
      icon: 'warning',
    })
      .then(() => {})
      .catch(() => {});
  }

  buscarVuelo() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      const tipoVuelo = this.formulario.controls['tipoVuelo'].value;
      if (!value.vueloDirecto) {
        value.vueloDirecto = false;
      }
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
    } else {
      this.verModalWarning('Por favor, diligencie todos los campos');
    }
  }
}
