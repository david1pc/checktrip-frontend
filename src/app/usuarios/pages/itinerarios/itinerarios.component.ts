import { Component } from '@angular/core';
import { UsuariosService } from '../../../../../src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css'],
})
export class ItinerariosComponent {
  data: any;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.buscarItinerarios();
  }

  buscarItinerarios() {
    let username: string = sessionStorage.getItem('username') ?? '';
    this.usuariosService.obtenerItinerarios(username).subscribe({
      next: (respuesta) => {
        this.data = respuesta;
      },
    });
  }
}
