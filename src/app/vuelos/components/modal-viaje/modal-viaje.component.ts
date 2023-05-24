import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Aircraft,
  Carriers,
  ClienteIdaViajes,
  Segment,
} from '../../interfaces/vuelos-bd.interface';
import { VuelosService } from '../../services/vuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-viaje',
  templateUrl: './modal-viaje.component.html',
  styleUrls: ['./modal-viaje.component.css'],
})
export class ModalViajeComponent {
  @Input() data: any;

  constructor(
    public modal: NgbActiveModal,
    private router: Router,
    private vuelosService: VuelosService
  ) {}

  guardarItinerario() {
    let viaje = this.estructurarDatos();

    let aircrafts: Aircraft[] = [];
    let carriers: Carriers[] = [];
    for (let segmento of this.data.viaje.itineraries[0].segments) {
      let aircraft: Aircraft = {
        id: segmento.aircraft.code,
        name: this.data.viaje.dictionaries.aircraft[segmento.aircraft.code],
      };
      aircrafts.push(aircraft);
    }

    for (let segmento of this.data.viaje.itineraries[0].segments) {
      let carrier: Carriers = {
        id: segmento.carrierCode,
        name: this.data.viaje.dictionaries.carriers[segmento.carrierCode],
      };
      carriers.push(carrier);
    }

    viaje.viaje.dictionaries.aircraft = aircrafts;
    viaje.viaje.dictionaries.carriers = carriers;

    this.vuelosService.guardarItinerarioIda(viaje).subscribe({
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
    Swal.fire('Guardar itinerario', mensaje, 'error')
      .then(() => {})
      .catch(() => {});
  }

  estructurarDatos() {
    let segmentos: Segment[] = this.data.viaje.itineraries[0].segments;
    let clienteIdaViaje: ClienteIdaViajes = {
      username: sessionStorage.getItem('username') ?? '',
      viaje: {
        dictionaries: {
          aircraft: this.data.viaje.dictionaries.aircraft,
          carriers: this.data.viaje.dictionaries.carriers,
        },
        itineraryDTO: {
          duration: this.data.viaje.itineraries[0].duration,
          segments: segmentos,
        },
        numberOfBookableSeats: this.data.viaje.numberOfBookableSeats,
        price: {
          base: Number(this.data.viaje.price.base),
          currency: this.data.viaje.price.currency,
          grandTotal: Number(this.data.viaje.price.grandTotal),
          total: Number(this.data.viaje.price.total),
        },
        travelClass: this.data.clase,
      },
      fechaCreacion: new Date(),
    };
    return clienteIdaViaje;
  }
}
