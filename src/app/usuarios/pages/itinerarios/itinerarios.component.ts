import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuariosService } from '../../../../../src/app/usuarios/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViajeIdaVueltaComponent } from '../../../../../src/app/vuelos/components/modal-viaje-ida-vuelta/modal-viaje-ida-vuelta.component';
import {
  ClienteViajes,
  Viaje,
} from '../../../../../src/app/vuelos/interfaces/vuelos-bd.interface';
import { ViajeInfo } from 'src/app/vuelos/interfaces/vuelos.interface';
import { ModalViajeComponent } from '../../../../../src/app/vuelos/components/modal-viaje/modal-viaje.component';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css'],
})
export class ItinerariosComponent {
  data: ClienteViajes = {
    viajesIda: [],
    viajesVuelta: [],
  };

  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  page: number = 1;

  buscando!: boolean;
  noHayVuelos!: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.buscarItinerarios();
  }

  buscarItinerarios() {
    this.buscando = true;
    let username: string = sessionStorage.getItem('username') ?? '';
    this.usuariosService.obtenerItinerarios(username).subscribe({
      next: (respuesta) => {
        this.data = respuesta;
        this.validarBusquedaVuelos();
      },
    });

  }

  abrirInfoViajeIda(viaje: Viaje) {
    this.verModal(viaje);
  }

  verModal(viaje: Viaje) {
    const modalRef = this.modalService.open(ModalViajeComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    console.log(
      viaje.dictionaries.carriers.filter(
        (carrier) => carrier.id == viaje.itineraryDTO.segments[0].carrierCode
      )
    );

    let viaje_2: ViajeInfo = {
      itineraries: [viaje.itineraryDTO],
      numberOfBookableSeats: viaje.numberOfBookableSeats,
      price: {
        base: String(viaje.price.base),
        currency: String(viaje.price.currency),
        fees: [],
        grandTotal: String(viaje.price.grandTotal),
        total: String(viaje.price.total),
      },
      dictionaries: viaje.dictionaries,
    };

    modalRef.componentInstance.data = {
      viaje: viaje_2,
      origen: viaje.itineraryDTO.segments[0].departure.iataCode,
      destino:
        viaje.itineraryDTO.segments[viaje.itineraryDTO.segments.length - 1]
          .arrival.iataCode,
      clase: viaje.travelClass,
    };
  }

  abrirInfoViaje(viaje_salida: Viaje, viaje_vuelta: Viaje) {
    this.verModalIdaVuelta(viaje_salida, viaje_vuelta);
  }

  verModalIdaVuelta(viaje_salida: Viaje, viaje_vuelta: Viaje) {
    const modalRef = this.modalService.open(ModalViajeIdaVueltaComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    let viaje_salida_2: ViajeInfo = {
      itineraries: [viaje_salida.itineraryDTO],
      numberOfBookableSeats: viaje_salida.numberOfBookableSeats,
      price: {
        base: String(viaje_salida.price.base),
        currency: String(viaje_salida.price.currency),
        fees: [],
        grandTotal: String(viaje_salida.price.grandTotal),
        total: String(viaje_salida.price.total),
      },
      dictionaries: viaje_salida.dictionaries,
    };

    let viaje_vuelta_2: ViajeInfo = {
      itineraries: [viaje_vuelta.itineraryDTO],
      numberOfBookableSeats: viaje_vuelta.numberOfBookableSeats,
      price: {
        base: String(viaje_vuelta.price.base),
        currency: String(viaje_vuelta.price.currency),
        fees: [],
        grandTotal: String(viaje_vuelta.price.grandTotal),
        total: String(viaje_vuelta.price.total),
      },
      dictionaries: viaje_vuelta.dictionaries,
    };

    modalRef.componentInstance.data = {
      viaje_salida: viaje_salida_2,
      viaje_vuelta: viaje_vuelta_2,
      origen: viaje_salida.itineraryDTO.segments[0].departure.iataCode,
      destino: viaje_salida.itineraryDTO.segments[0].arrival.iataCode,
      clase: viaje_salida.travelClass,
      total:
        Number(viaje_salida.price.total) + Number(viaje_vuelta.price.total),
    };
  }

  validarBusquedaVuelos() {
    this.buscando = false;
    if (this.data.viajesIda.length == 0 && this.data.viajesVuelta.length == 0) {
      this.noHayVuelos = true;
    } else {
      this.noHayVuelos = false;
    }
  }

  onDataChange(event: any) {
    this.page = event;
  }

  exportarPDF(idCard: string) {
    const DATA: any = document.getElementById(idCard);
    const doc = new jsPDF('landscape', 'pt', 'a4');
    const options = {
      background: '#ECDCD7',
      scale: 3
    };
    let nombre = `${new Date().toISOString()}_Report.pdf`;

      html2canvas(DATA, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Añadir imagen Canvas a PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

        return doc;
      }).then((docResult) => {
        docResult.save(nombre);
      });
  }
}
