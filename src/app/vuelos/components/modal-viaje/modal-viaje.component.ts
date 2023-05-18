import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteIdaViajes } from '../../interfaces/vuelos-bd.interface';

@Component({
  selector: 'app-modal-viaje',
  templateUrl: './modal-viaje.component.html',
  styleUrls: ['./modal-viaje.component.css'],
})
export class ModalViajeComponent {
  @Input() data: any;

  constructor(public modal: NgbActiveModal, private router: Router) {}

  guardarItinerario() {
    console.log('En construcción...');
  }

  estructurarDatos() {
    let clienteIdaViaje: ClienteIdaViajes = {
      username: sessionStorage.getItem('username') ?? '',
      viaje: {
        dictionaries: {
          aircraft: this.data.viaje.dictionaries.aircraft,
          carriers: this.data.viaje.dictionaries.carriers,
        },
        itineraries: this.data.viaje.itineraries,
        numberOfBookableSeats: this.data.viaje.numberOfBookableSeats,
        price: {
          base: this.data.viaje.price.base,
          currency: this.data.viaje.price.currency,
          grandTotal: this.data.viaje.price.grandTotal,
          total: this.data.viaje.price.total,
        },
      },
    };
    return clienteIdaViaje;
  }
}
