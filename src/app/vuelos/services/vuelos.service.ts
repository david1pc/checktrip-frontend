import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Busqueda, Viajes } from '../interfaces/vuelos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VuelosService {
  constructor(private http: HttpClient) {}

  buscarCiudadesVuelos(ciudad: string) {
    let parametro_ciudad: string = `?keyword=${ciudad}&max=5`;
    let urlApi: string =
      'https://test.api.amadeus.com/v1/reference-data/locations/cities' +
      parametro_ciudad;
    return this.http.get<Busqueda>(urlApi);
  }

  flightOffers(
    codigoOrigen: string,
    codigoDestino: string,
    fechaSalida: string,
    cantidadAdultos: string,
    cantidadInfantes: string,
    clase: string
  ): Observable<any> {
    let travelClass: string = clase ? '&travelClass=' + clase : '';
    let parametros: string = `?originLocationCode=${codigoOrigen}&destinationLocationCode=${codigoDestino}&departureDate=${fechaSalida}&adults=${cantidadAdultos}&children=${cantidadInfantes}&nonStop=true&max=250${travelClass}`;
    let urlApi: string =
      'https://test.api.amadeus.com/v2/shopping/flight-offers' + parametros;
    return this.http.get<Viajes>(urlApi);
  }
}