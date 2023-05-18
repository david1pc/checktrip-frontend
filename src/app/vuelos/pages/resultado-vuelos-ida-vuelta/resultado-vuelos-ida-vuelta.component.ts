import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VuelosService } from '../../services/vuelos.service';
import {
  Datum,
  OfertaViaje,
  ViajeInfo,
  Viajes,
} from '../../interfaces/vuelos.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalViajeIdaVueltaComponent } from '../../components/modal-viaje-ida-vuelta/modal-viaje-ida-vuelta.component';

@Component({
  selector: 'app-resultado-vuelos-ida-vuelta',
  templateUrl: './resultado-vuelos-ida-vuelta.component.html',
  styleUrls: ['./resultado-vuelos-ida-vuelta.component.css'],
})
export class ResultadoVuelosIdaVueltaComponent {
  origen: string = '';
  destino: string = '';
  salida: string = '';
  vuelta: string = '';
  adultos: string = '';
  infantes: string = '';
  clase: string = '';
  vueloDirecto: string = '';
  esDirecto: string = '';

  viajes_salida: OfertaViaje[] = [];
  viajes_vuelta: OfertaViaje[] = [];
  viajes: ViajesUnidos[] = [];

  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  page: number = 1;

  // Busqueda de viaje
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
    private route: ActivatedRoute,
    private vuelosService: VuelosService,
    private modalService: NgbModal,
    private formBuider: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuider.group({
      ciudadOrigen: ['', []],
      ciudadDestino: ['', []],
      fecha_salida: ['', [Validators.required]],
      fecha_vuelta: ['', [Validators.required]],
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
    this.buscarVuelos();
  }

  obtenerDatosRuta(params: any) {
    this.origen = params.get('origen') ?? '';
    this.destino = params.get('destino') ?? '';
    this.salida = params.get('salida') ?? '';
    this.vuelta = params.get('vuelta') ?? '';
    this.adultos = params.get('adultos') ?? '';
    this.infantes = params.get('infantes') ?? '';
    this.clase = params.get('clase') ?? '';
    this.vueloDirecto = params.get('vueloDirecto') ?? '';

    if (this.vueloDirecto === 'true') {
      this.esDirecto = 'Directo';
    }
  }

  buscarVuelosSalida() {
    this.vuelosService
      .flightOffers(
        this.origen,
        this.destino,
        this.salida,
        this.adultos,
        this.infantes,
        this.clase,
        this.vueloDirecto
      )
      .subscribe({
        next: (resultado: Viajes) => {
          this.viajes_salida = [];
          resultado.data.forEach((viaje) => {
            let viajeInfo: ViajeInfo = {
              itineraries: viaje.itineraries,
              numberOfBookableSeats: viaje.numberOfBookableSeats,
              price: viaje.price,
              dictionaries: resultado.dictionaries,
            };
            this.viajes_salida.push({ viaje: viajeInfo });
          });
          this.buscarVuelosVuelta();
        },
      });
  }

  buscarVuelosVuelta() {
    this.vuelosService
      .flightOffers(
        this.destino,
        this.origen,
        this.vuelta,
        this.adultos,
        this.infantes,
        this.clase,
        this.vueloDirecto
      )
      .subscribe({
        next: (resultado: Viajes) => {
          this.viajes_vuelta = [];
          resultado.data.forEach((viaje) => {
            let viajeInfo: ViajeInfo = {
              itineraries: viaje.itineraries,
              numberOfBookableSeats: viaje.numberOfBookableSeats,
              price: viaje.price,
              dictionaries: resultado.dictionaries,
            };
            this.viajes_vuelta.push({ viaje: viajeInfo });
          });
          this.viajes = [];
          this.asignarVuelosIdaVuelta();
        },
      });
  }

  buscarOfertasIdaVuelta() {
    this.buscarVuelosSalida();
  }

  asignarVuelosIdaVuelta() {
    let count = 0;
    while (count <= this.viajes_salida.length) {
      if (this.viajes_salida[count] && this.viajes_vuelta[count]) {
        this.viajes.push({
          viaje_salida: this.viajes_salida[count],
          viaje_vuelta: this.viajes_vuelta[count],
        });
      } else {
        break;
      }
      count += 1;
    }
  }

  buscarVuelos() {
    this.route.paramMap.subscribe((params) => {
      this.obtenerDatosRuta(params);
      this.buscarOfertasIdaVuelta();
    });

    this.formulario.controls['ciudadOrigen'].setValue(
      sessionStorage.getItem('busqueda_origen')
    );
    this.formulario.controls['ciudadDestino'].setValue(
      sessionStorage.getItem('busqueda_destino')
    );

    this.busqueda_origen = sessionStorage.getItem('busqueda_origen') ?? '';
    this.busqueda_destino = sessionStorage.getItem('busqueda_destino') ?? '';
    this.seleccionar_ciudad_origen(this.busqueda_origen);
    this.seleccionar_ciudad_destino(this.busqueda_destino);
    this.formulario.controls['fecha_salida'].setValue(this.salida);
    this.formulario.controls['fecha_vuelta'].setValue(this.vuelta);
    this.formulario.controls['cantidadAdultos'].setValue(this.adultos);
    this.formulario.controls['cantidadInfantes'].setValue(this.infantes);
    this.formulario.controls['tipoVuelo'].setValue('idavuelta');
    this.formulario.controls['travelClass'].setValue(this.clase);
    let opcion = false;
    if (this.vueloDirecto == 'true') {
      opcion = true;
    }
    this.formulario.controls['vueloDirecto'].setValue(opcion);
  }

  abrirInfoViaje(viaje_salida: ViajeInfo, viaje_vuelta: ViajeInfo) {
    this.verModal(viaje_salida, viaje_vuelta);
  }

  verModal(viaje_salida: ViajeInfo, viaje_vuelta: ViajeInfo) {
    const modalRef = this.modalService.open(ModalViajeIdaVueltaComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      viaje_salida: viaje_salida,
      viaje_vuelta: viaje_vuelta,
      origen: this.origen,
      destino: this.destino,
      clase: this.clase,
      total:
        Number(viaje_salida.price.total) + Number(viaje_vuelta.price.total),
    };
  }

  onDataChange(event: any) {
    this.page = event;
  }

  // Buscar viajes
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
      error: (err) => {
        console.error(err.error);
      },
    });
  }

  seleccionar_ciudad_origen(ciudad: string) {
    const iata_code = ciudad.split('(')[1].replace(')', '');
    this.ciudadOrigen = iata_code;
  }

  seleccionar_ciudad_destino(ciudad: string) {
    const iata_code = ciudad.split('(')[1].replace(')', '');
    this.ciudadDestino = iata_code;
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
      error: (err) => {
        console.error(err.error);
      },
    });
  }

  buscarVuelo() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      const tipoVuelo = this.formulario.controls['tipoVuelo'].value;
      if (tipoVuelo == 'ida') {
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
}

export interface ViajesUnidos {
  viaje_salida: any;
  viaje_vuelta: any;
}
