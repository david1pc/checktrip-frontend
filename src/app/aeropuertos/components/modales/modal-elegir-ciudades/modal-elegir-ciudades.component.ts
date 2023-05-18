import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AirportCitySearchService } from 'src/app/aeropuertos/services/airport-city-search.service';

@Component({
  selector: 'app-modal-elegir-ciudades',
  templateUrl: './modal-elegir-ciudades.component.html',
})
export class ModalElegirCiudadesComponent implements OnInit {
  @Input() data: any;
  ciudades: any[] = [];
  formulario: FormGroup;

  constructor(
    private formBuider: FormBuilder,
    public modal: NgbActiveModal,
    private services: AirportCitySearchService,
    private router: Router
  ) {
    this.formulario = this.formBuider.group({
      codigoDestino: ['', [Validators.required]],
      nombreDestino: [''],
    });
  }

  ngOnInit(): void {
    this.consultarCiudadesDestino(this.data.codigo);
  }

  consultarCiudadesDestino(codigo: string) {
    if (codigo) {
      this.services.directDestinations(codigo).subscribe({
        next: (response) => {
          this.ciudades = this.estructurarDatos(response.data);
        },
      });
    }
  }

  estructurarDatos(response: any[]): any[] {
    return response.map((item) => {
      let registro: any = {
        nombre: item.name,
        codigo: item.iataCode,
      };

      return registro;
    });
  }

  changeDestino(nombre: string, codigo: string) {
    this.formulario.get('codigoDestino')?.setValue(codigo);
    this.formulario.get('nombreDestino')?.setValue(nombre);
  }

  buscarVuelos() {
    if (this.formulario.valid) {
      this.modal.dismiss();
      this.router
        .navigate([
          '/aeropuertos/busqueda',
          this.data.codigo,
          this.data.nombre,
          this.formulario.value.codigoDestino,
          this.formulario.value.nombreDestino,
        ])
        .then(() => {})
        .catch(() => {});
    }
  }
}
