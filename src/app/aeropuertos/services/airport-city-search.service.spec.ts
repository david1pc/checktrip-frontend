import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AirportCitySearchService } from '../../../../src/app/aeropuertos/services/airport-city-search.service';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('AuthChecktripService', () => {
  let airportCitySearchService: AirportCitySearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [AirportCitySearchService],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});
    airportCitySearchService = TestBed.inject(AirportCitySearchService);
  });

  it('should post searchslocations', () => {
    let status = 200;

    airportCitySearchService.searchslocations('MAD').subscribe((resp) => {
      expect(resp.status).toBe(status);
    });
  });

  it('should post directDestinations', () => {
    let status = 200;

    airportCitySearchService.directDestinations('MAD').subscribe((resp) => {
      expect(resp.status).toBe(status);
    });
  });

  it('should post flightOffers', () => {
    let status = 200;

    airportCitySearchService
      .flightOffers('AXM', 'BOG', '2023-06-25', '1', 'ECONOMY')
      .subscribe((resp) => {
        expect(resp.status).toBe(status);
      });
  });
});
