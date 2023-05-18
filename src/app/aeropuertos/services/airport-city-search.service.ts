import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AirportCitySearchService {
  constructor(private http: HttpClient) {}

  searchslocations(keyword: string): Observable<any> {
    let parametros: string = `?subType=AIRPORT&keyword=${keyword}&page%5Blimit%5D=100&page%5Boffset%5D=0&sort=analytics.travelers.score&view=LIGHT`;
    let urlApi: string =
      'https://test.api.amadeus.com/v1/reference-data/locations' + parametros;
    return this.http.get<any>(urlApi);
  }

  directDestinations(codigo: string): Observable<any> {
    let parametros: string = `?departureAirportCode=${codigo}`;
    let urlApi: string =
      'https://test.api.amadeus.com/v1/airport/direct-destinations' +
      parametros;
    return this.http.get<any>(urlApi);
  }

  flightOffers(
    codigoOrigen: string,
    codigoDestino: string,
    fechaSalida: string,
    cantidadAdultos: string,
    clase: string
  ): Observable<any> {
    let travelClass: string = clase ? '&travelClass=' + clase : '';
    let parametros: string = `?originLocationCode=${codigoOrigen}&destinationLocationCode=${codigoDestino}&departureDate=${fechaSalida}&adults=${cantidadAdultos}&nonStop=true&max=250${travelClass}`;
    let urlApi: string =
      'https://test.api.amadeus.com/v2/shopping/flight-offers' + parametros;
    return this.http.get<any>(urlApi);
  }
}
