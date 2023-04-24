import { Component } from '@angular/core';
import { AirportCitySearchService } from 'src/app/services/airport-city-search.service';

@Component({
  selector: 'app-filtro-general',
  templateUrl: './filtro-general.component.html',
  styleUrls: ['./filtro-general.component.css']
})
export class FiltroGeneralComponent {

  dataService: any = null;

  constructor(private airportCitySearchService: AirportCitySearchService){
    
  }

  consultar(){
    this.airportCitySearchService.searchslocations().subscribe({
      next: (response) => {
        this.dataService = response;
      },
    });
  }

}
