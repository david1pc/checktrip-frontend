import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirportCitySearchService } from 'src/app/services/airport-city-search.service';

@Component({
  selector: 'app-filtro-general',
  templateUrl: './filtro-general.component.html',
  styleUrls: ['./filtro-general.component.css']
})
export class FiltroGeneralComponent {

  formulario: FormGroup;
  aeropuertos: any[] = [];

  constructor(private formBuider: FormBuilder, private airportCitySearchService: AirportCitySearchService){
    this.formulario = this.formBuider.group({
      keyword: ['', [Validators.required]]
    });
  }

  consultar(){

    if(this.formulario.valid){
      this.airportCitySearchService.searchslocations(this.formulario.value.keyword).subscribe({
        next: (response) => {
          this.aeropuertos = this.estructurarDatos(response.data);
        },
      });
    }
    
  }

  estructurarDatos(response: any[]): any[]{

    return response.map(item => {

      let registro: any = {
        nombre: item.name,
        codigo: item.id,
        ciudad: item.address.cityName,
        pais: item.address.countryName
      };

      return registro
    });
  }

} 