import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeInfo } from '../../interfaces/vuelos.interface';
import { ModalViajeComponent } from '../../components/modal-viaje/modal-viaje.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViajeIdaVueltaComponent } from '../../components/modal-viaje-ida-vuelta/modal-viaje-ida-vuelta.component';

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.css']
})
export class DetalleHistorialComponent {

  viajes: any[] = [];
  soloIda: boolean = false;

  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  page: number = 1;

  origen:string = 'origen';
  destino: string = 'destino';
  clase: string = 'clase';
  salida:Date = new Date();
  vuelta:Date = new Date();

  constructor(private route: ActivatedRoute, private modalService: NgbModal){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.obtenerDatosRuta(params);
    });
  }

  obtenerDatosRuta(params: any) {
    let idHistorial = params.get('id') ?? '';
    if(idHistorial){
      let historialVuelos = localStorage.getItem("historial_vuelos");
      let historial: any[] = historialVuelos ? JSON.parse(historialVuelos) : [];
      let registro: any = historial.find(h => h.id == idHistorial);
      
      this.soloIda = registro.soloIda;
      this.viajes = registro.objeto;
      this.obtenerTitulos(registro, this.soloIda);
    }
  }

  obtenerTitulos(registro: any, soloIda:boolean){
    
    this.origen = registro.origen;
    this.destino = registro.destino;
    this.salida = new Date(registro.fechaSalida);
    this.clase = registro.clase;

    if(soloIda){
      this.vuelta = new Date(registro.fechaVuelta);
    }
  }

  onDataChange(event: any) {
    this.page = event;
  }

  abrirInfoViajeIda(viaje: ViajeInfo) {
    this.verModalIda(viaje);
  }

  verModalIda(viaje: ViajeInfo) {
    const modalRef = this.modalService.open(ModalViajeComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      viaje: viaje,
      origen: this.origen,
      destino: this.destino,
      clase: this.clase,
    };
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
}
