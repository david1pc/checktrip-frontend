import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VuelosService } from '../../services/vuelos.service';
import {
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
  buscando!: boolean;
  noHayVuelos!: boolean;

  viajes_salida: OfertaViaje[] = [];
  viajes_vuelta: OfertaViaje[] = [];
  viajes: ViajesUnidos[] = [];

  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  page: number = 1;

  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private vuelosService: VuelosService,
    private modalService: NgbModal,
    private formBuider: FormBuilder
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
    this.buscando = true;
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
          this.asignarViajesSalidaVuelta(resultado, this.viajes_salida);
          this.buscarVuelosVuelta();
        },
      });
  }

  asignarViajesSalidaVuelta(resultado: Viajes, viajes: OfertaViaje[]) {
    resultado.data.forEach((viaje) => {
      let viajeInfo: ViajeInfo = {
        itineraries: viaje.itineraries,
        numberOfBookableSeats: viaje.numberOfBookableSeats,
        price: viaje.price,
        dictionaries: resultado.dictionaries,
      };
      viajes.push({ viaje: viajeInfo });
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
          this.asignarViajesSalidaVuelta(resultado, this.viajes_vuelta);
          this.asignarVuelosIdaVuelta();
          this.validarBusquedaVuelos();
        },
      });
  }

  validarBusquedaVuelos() {
    this.buscando = false;
    if (this.viajes.length == 0) {
      this.noHayVuelos = true;
    } else {
      this.noHayVuelos = false;
    }
  }

  buscarOfertasIdaVuelta() {
    this.buscarVuelosSalida();
  }

  asignarVuelosIdaVuelta() {
    this.viajes = [];
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
}

export interface ViajesUnidos {
  viaje_salida: any;
  viaje_vuelta: any;
}
