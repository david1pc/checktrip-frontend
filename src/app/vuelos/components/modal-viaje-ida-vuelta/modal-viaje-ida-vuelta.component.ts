import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Aircraft,
  Carriers,
  ClienteIdaVueltaViajes,
  Viaje,
} from '../../interfaces/vuelos-bd.interface';
import Swal from 'sweetalert2';
import { VuelosService } from '../../services/vuelos.service';

@Component({
  selector: 'app-modal-viaje-ida-vuelta',
  templateUrl: './modal-viaje-ida-vuelta.component.html',
  styleUrls: ['./modal-viaje-ida-vuelta.component.css'],
})
export class ModalViajeIdaVueltaComponent {
  @Input() data: any;

  constructor(
    public modal: NgbActiveModal,
    private router: Router,
    private vuelosService: VuelosService
  ) {}

  guardarItinerario() {
    let viaje = this.estructurarDatos();

    let aircrafts_ida: Aircraft[] = [];
    let carriers_ida: Carriers[] = [];

    let aircrafts_vuelta: Aircraft[] = [];
    let carriers_vuelta: Carriers[] = [];

    for (let segmento of this.data.viaje_salida.itineraries[0].segments) {
      let aircraft: Aircraft = {
        id: segmento.aircraft.code,
        name: this.data.viaje_salida.dictionaries.aircraft[
          segmento.aircraft.code
        ],
      };
      aircrafts_ida.push(aircraft);
    }

    for (let segmento of this.data.viaje_salida.itineraries[0].segments) {
      let carrier: Carriers = {
        id: segmento.carrierCode,
        name: this.data.viaje_salida.dictionaries.carriers[
          segmento.carrierCode
        ],
      };
      carriers_ida.push(carrier);
    }

    for (let segmento of this.data.viaje_vuelta.itineraries[0].segments) {
      let aircraft: Aircraft = {
        id: segmento.aircraft.code,
        name: this.data.viaje_vuelta.dictionaries.aircraft[
          segmento.aircraft.code
        ],
      };
      aircrafts_vuelta.push(aircraft);
    }

    for (let segmento of this.data.viaje_vuelta.itineraries[0].segments) {
      let carrier: Carriers = {
        id: segmento.carrierCode,
        name: this.data.viaje_vuelta.dictionaries.carriers[
          segmento.carrierCode
        ],
      };
      carriers_vuelta.push(carrier);
    }

    viaje.viajeIda.dictionaries.aircraft = aircrafts_ida;
    viaje.viajeIda.dictionaries.carriers = carriers_ida;

    viaje.viajeVuelta.dictionaries.aircraft = aircrafts_vuelta;
    viaje.viajeVuelta.dictionaries.carriers = carriers_vuelta;

    this.vuelosService.guardarItinerarioIdaVuelta(viaje).subscribe({
      next: (respuesta: any) => {
        this.verModal(respuesta.descripcion);
      },
      error: (error) => {
        this.verModalError('Ha ocurrido un error guardando el itinerario.');
      },
    });
  }

  verModal(mensaje: string) {
    Swal.fire('Guardar itinerario', mensaje, 'success')
      .then(() => {})
      .catch(() => {});
  }

  verModalError(mensaje: string) {
    Swal.fire('Guardar itinerario', mensaje, 'error');
  }

  estructurarDatos() {
    let viajeIda: Viaje = {
      dictionaries: {
        aircraft: this.data.viaje_salida.dictionaries.aircraft,
        carriers: this.data.viaje_salida.dictionaries.carriers,
      },
      itineraryDTO: this.data.viaje_salida.itineraries[0],
      numberOfBookableSeats: this.data.viaje_salida.numberOfBookableSeats,
      price: {
        base: Number(this.data.viaje_salida.price.base),
        currency: this.data.viaje_salida.price.currency,
        grandTotal: Number(this.data.viaje_salida.price.grandTotal),
        total: Number(this.data.viaje_salida.price.total),
      },
      travelClass: this.data.clase,
    };
    let viajeVuelta: Viaje = {
      dictionaries: {
        aircraft: this.data.viaje_vuelta.dictionaries.aircraft,
        carriers: this.data.viaje_vuelta.dictionaries.carriers,
      },
      itineraryDTO: this.data.viaje_vuelta.itineraries[0],
      numberOfBookableSeats: this.data.viaje_vuelta.numberOfBookableSeats,
      price: {
        base: Number(this.data.viaje_vuelta.price.base),
        currency: this.data.viaje_vuelta.price.currency,
        grandTotal: Number(this.data.viaje_vuelta.price.grandTotal),
        total: Number(this.data.viaje_vuelta.price.total),
      },
      travelClass: this.data.clase,
    };

    let clienteIdaVueltaViaje: ClienteIdaVueltaViajes = {
      username: sessionStorage.getItem('username') ?? '',
      viajeIda: viajeIda,
      viajeVuelta: viajeVuelta,
      fechaCreacion: new Date(),
    };

    return clienteIdaVueltaViaje;
  }
}
