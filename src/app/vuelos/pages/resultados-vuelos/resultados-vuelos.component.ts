import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VuelosService } from '../../services/vuelos.service';
import {
  OfertaViaje,
  ViajeInfo,
  Viajes,
} from '../../interfaces/vuelos.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViajeComponent } from '../../components/modal-viaje/modal-viaje.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resultados-vuelos',
  templateUrl: './resultados-vuelos.component.html',
  styleUrls: ['./resultados-vuelos.component.css'],
})
export class ResultadosVuelosComponent {
  origen: string = '';
  destino: string = '';
  salida: string = '';
  adultos: string = '';
  infantes: string = '';
  clase: string = '';
  vueloDirecto: string = '';
  esDirecto: string = '';

  viajes: OfertaViaje[] = [];

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
    this.buscarVuelos();
  }

  buscarVuelos() {
    this.route.paramMap.subscribe((params) => {
      this.origen = params.get('origen') ?? '';
      this.destino = params.get('destino') ?? '';
      this.salida = params.get('salida') ?? '';
      this.adultos = params.get('adultos') ?? '';
      this.infantes = params.get('infantes') ?? '';
      this.clase = params.get('clase') ?? '';
      this.vueloDirecto = params.get('vueloDirecto') ?? '';

      if (this.vueloDirecto === 'true') {
        this.esDirecto = 'Directo';
      }

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
            this.viajes = [];
            resultado.data.forEach((viaje) => {
              let viajeInfo: ViajeInfo = {
                itineraries: viaje.itineraries,
                numberOfBookableSeats: viaje.numberOfBookableSeats,
                price: viaje.price,
                dictionaries: resultado.dictionaries,
              };
              this.viajes.push({ viaje: viajeInfo });
            });
          },
        });
    });

    this.formulario.controls['ciudadOrigen'].setValue(
      sessionStorage.getItem('busqueda_origen')
    );
    this.formulario.controls['ciudadDestino'].setValue(
      sessionStorage.getItem('busqueda_destino')
    );

    this.formulario.controls['fecha_salida'].setValue(this.salida);
    this.formulario.controls['cantidadAdultos'].setValue(this.adultos);
    this.formulario.controls['cantidadInfantes'].setValue(this.infantes);
    this.formulario.controls['tipoVuelo'].setValue('ida');
    this.formulario.controls['travelClass'].setValue(this.clase);
    let opcion = false;
    if (this.vueloDirecto == 'true') {
      opcion = true;
    }
    this.formulario.controls['vueloDirecto'].setValue(opcion);
  }

  abrirInfoViaje(viaje: ViajeInfo) {
    this.verModal(viaje);
  }

  verModal(viaje: ViajeInfo) {
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

  onDataChange(event: any) {
    this.page = event;
  }
}
