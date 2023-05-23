import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Busqueda, Viajes } from '../interfaces/vuelos.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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
    clase: string,
    vueloDirecto: string
  ): Observable<any> {
    let travelClass: string = clase ? '&travelClass=' + clase : '';
    let currency: string = sessionStorage.getItem('divisa') ?? 'COP';
    let parametros: string = `?originLocationCode=${codigoOrigen}&destinationLocationCode=${codigoDestino}&departureDate=${fechaSalida}&adults=${cantidadAdultos}&children=${cantidadInfantes}&nonStop=${vueloDirecto}&currencyCode=${currency}&max=250${travelClass}`;
    let urlApi: string =
      'https://test.api.amadeus.com/v2/shopping/flight-offers' + parametros;
    return this.http.get<Viajes>(urlApi);
  }

  filtrarHistorial(fechaSalida: string, fechaVuelta:string, username:string): Observable<any> {
    let parametros: string = `?fechaInicio=${fechaSalida}&fechaFin=${fechaVuelta}&username=${username}`;
    let urlApi: string = environment.url_api_checktrip +'historial/filter'+ parametros;
    return this.http.get<any>(urlApi);
  }

  guardarHistorial(dtoHistorial:any): Observable<any>{
    return this.http.post<any>(
      environment.url_api_checktrip + 'historial/guardar',
      dtoHistorial
    );
  }
}
