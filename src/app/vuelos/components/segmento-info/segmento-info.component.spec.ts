import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../../../src/app/auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { SharedModule } from '../../../../../src/app/shared/shared.module';
import { Router } from '@angular/router';
import { SegmentoInfoComponent } from './segmento-info.component';
import { AirportCitySearchService } from '../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { retornarDatos } from '../../pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component.spec';
import { Aircraft, Carriers } from '../../interfaces/vuelos-bd.interface';

describe('SegmentoInfoComponent', () => {
  let component: SegmentoInfoComponent;
  let fixture: ComponentFixture<SegmentoInfoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegmentoInfoComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbModalModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        AuthenticationService,
        Router,
        AirportCitySearchService,
        NgbActiveModal,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentoInfoComponent);
    component = fixture.componentInstance;
    let datos: any = retornarDatos(1);
    let aircrafts: Aircraft[] = [];
    let carriers: Carriers[] = [];
    for (let segmento of datos.itineraries[0].segments) {
      let aircraft: Aircraft = {
        id: segmento.aircraft.code,
        name: datos.dictionaries.aircraft[segmento.aircraft.code],
      };
      aircrafts.push(aircraft);
    }

    for (let segmento of datos.itineraries[0].segments) {
      let carrier: Carriers = {
        id: segmento.carrierCode,
        name: datos.dictionaries.carriers[segmento.carrierCode],
      };
      carriers.push(carrier);
    }

    component.viaje = {
      dictionaries: {
        carriers: carriers,
        aircraft: aircrafts,
      },
      price: datos.price,
    };
    component.segmento = {
      departure: datos.itineraries[0].segments[0].departure,
      duration: datos.itineraries[0].segments[0].duration,
      arrival: datos.itineraries[0].segments[0].arrival,
      carrierCode: datos.itineraries[0].segments[0].carrierCode,
      aircraft: datos.itineraries[0].segments[0].aircraft,
    };
    component.clase = {
      clase: 'ECONOMY',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should obtenerAerolinea', (done) => {
    let datos: any = retornarDatos(1);
    let segmento = datos.itineraries[0].segments[0];
    fixture.detectChanges();
    component.obtenerAerolinea(segmento);
    component.obtenerAvion(segmento);
    done();
  });
});
