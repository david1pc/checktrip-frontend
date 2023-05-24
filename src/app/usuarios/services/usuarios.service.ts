import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { ClienteViajes } from '../../../../src/app/vuelos/interfaces/vuelos-bd.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  obtenerItinerarios(username: string) {
    return this.http.post<any>(environment.url_api_checktrip + 'itinerary', {
      username: username,
    });
  }
}
