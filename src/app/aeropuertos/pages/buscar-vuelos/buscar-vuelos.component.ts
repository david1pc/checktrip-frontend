import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AirportCitySearchService } from 'src/app/aeropuertos/services/airport-city-search.service';

@Component({
  selector: 'app-buscar-vuelos',
  templateUrl: './buscar-vuelos.component.html',
  styleUrls: ['./buscar-vuelos.component.css'],
})
export class BuscarVuelosComponent implements OnInit {
  codigoOrigen: string = '';
  codigoDestino: string = '';
  nombreOrigen: string = '';
  nombreDestino: string = '';

  formulario: FormGroup;
  vuelos: any[] = [];
  yaBusco: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuider: FormBuilder,
    private services: AirportCitySearchService
  ) {
    this.formulario = this.formBuider.group({
      originLocationCode: ['', [Validators.required]],
      destinationLocationCode: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      travelClass: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codigoOrigen = params.get('param1') ?? '';
      this.nombreOrigen = params.get('param2') ?? '';
      this.codigoDestino = params.get('param3') ?? '';
      this.nombreDestino = params.get('param4') ?? '';

      this.formulario.get('originLocationCode')?.setValue(this.codigoOrigen);
      this.formulario
        .get('destinationLocationCode')
        ?.setValue(this.codigoDestino);
    });
  }

  consultar() {
    if (this.formulario.valid) {
      this.yaBusco = true;
      let value: any = this.formulario.value;
      this.services
        .flightOffers(
          value.originLocationCode,
          value.destinationLocationCode,
          value.departureDate,
          value.adults,
          value.travelClass
        )
        .subscribe({
          next: (response) => {
            this.vuelos = this.estructurarDatos(response.data);
          },
        });
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

      /*registro.itinerarios = item.itineraries[0].segments.map((item2: any) => {
        let registroItine: any = {
          iataCode: item2.iataCode
        };

        return registroItine;
      });*/

      return registro;
    });
  }
}
