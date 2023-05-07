import { Component, OnInit } from '@angular/core';
import { VuelosService } from '../../services/vuelos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Datum, Viajes } from '../../interfaces/vuelos.interface';
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
  hayError: boolean = false;
  yaBusco: boolean = false;

  ciudadOrigen: string = '';
  ciudadDestino: string = '';
  fecha_salida!: Date;
  fecha_vuelta!: Date;
  cantidadAdultos: number = 1;
  cantidadInfantes: number = 0;
  travelClass: string = '';
  tipoVuelo: string = '';

  formulario: FormGroup;
  vuelos: any[] = [];

  constructor(
    private vuelosService: VuelosService,
    private route: ActivatedRoute,
    private formBuider: FormBuilder,
    private modalService: NgbModal
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
    this.hayError = false;
    this.termino_origen = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_origen).subscribe({
      next: (busqueda) => {
        busqueda.data.map((ciudad) => {
          if (ciudad.iataCode) {
            this.ciudades_origen.push(ciudad);
          }
        });
      },
      error: (err) => {
        this.hayError = true;
      },
    });
  }

  sugerencias_origen(termino: string) {
    this.ciudades_origen = [];
    this.hayError = false;
    this.termino_origen = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_origen).subscribe({
      next: (busqueda) => {
        busqueda.data.map((ciudad) => {
          if (ciudad.iataCode) {
            this.ciudades_origen.push(ciudad);
          }
        });
      },
      error: (err) => {
        this.hayError = true;
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
    this.hayError = false;
    this.termino_destino = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_destino).subscribe({
      next: (busqueda) => {
        busqueda.data.map((ciudad) => {
          if (ciudad.iataCode) {
            console.log(ciudad);
            this.ciudades_destino.push(ciudad);
          }
        });
      },
      error: (err) => {
        this.hayError = true;
      },
    });
  }

  sugerencias_destino(termino: string) {
    this.ciudades_destino = [];
    this.hayError = false;
    this.termino_destino = termino;
    this.vuelosService.buscarCiudadesVuelos(this.termino_destino).subscribe({
      next: (busqueda) => {
        busqueda.data.map((ciudad) => {
          if (ciudad.iataCode) {
            this.ciudades_destino.push(ciudad);
          }
        });
      },
      error: (err) => {
        this.hayError = true;
      },
    });
  }

  buscarVuelo() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      this.yaBusco = true;
      const tipoVuelo = this.formulario.controls['tipoVuelo'].value;
      if (tipoVuelo == 'ida') {
        this.vuelosService
          .flightOffers(
            this.ciudadOrigen,
            this.ciudadDestino,
            value.fecha_salida,
            value.cantidadAdultos,
            value.cantidadInfantes,
            value.travelClass
          )
          .subscribe({
            next: (resultado: Viajes) => {
              this.vuelos = this.estructurarDatos(resultado.data);
            },
          });
      } else {
      }
    }
  }

  estructurarDatos(response: any[]): any[] {
    return response.map((item) => {
      let registro: any = {
        numeroAsientosReservables: item.numberOfBookableSeats,
        ultimaFechaEmisionBoletos: item.lastTicketingDateTime,
        divisa: item.price.currency,
        total: item.price.grandTotal,
        itinerarios: [],
      };

      return registro;
    });
  }
}
