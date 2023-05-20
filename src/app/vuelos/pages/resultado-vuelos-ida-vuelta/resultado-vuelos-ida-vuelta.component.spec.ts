import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { ResultadoVuelosIdaVueltaComponent } from '../../../../../src/app/vuelos/pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component';
import { BusquedaVuelosComponent } from '../../../../../src/app/vuelos/components/busqueda-vuelos/busqueda-vuelos.component';
import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { AuthChecktripService } from '../../../../../src/app/auth/services/auth-checktrip.service';
import { VuelosService } from '../../../../../src/app/vuelos/services/vuelos.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../../src/app/auth/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../../src/app/material/material.module';
import { of } from 'rxjs';
import { Viajes } from '../../interfaces/vuelos.interface.js';
import { ModalViajeIdaVueltaComponent } from '../../../../../src/app/vuelos/components/modal-viaje-ida-vuelta/modal-viaje-ida-vuelta.component';

describe('ResultadoVuelosIdaVueltaComponent', () => {
  let component: ResultadoVuelosIdaVueltaComponent;
  let fixture: ComponentFixture<ResultadoVuelosIdaVueltaComponent>;
  let authenticationServiceMock: any;
  let authServiceMock: any;
  let vuelosServiceMock: any;

  beforeEach(async () => {
    authenticationServiceMock = {
      login: jest.fn(),
      guardarToken: jest.fn(),
    };

    authServiceMock = {
      loginChecktrip: jest.fn(),
    };

    vuelosServiceMock = {
      flightOffers: jest.fn(),
    };

    const mockActivatedRoute = establecerParametros();

    await TestBed.configureTestingModule({
      declarations: [
        ResultadoVuelosIdaVueltaComponent,
        BusquedaVuelosComponent,
        CiudadInputComponent,
        CiudadDestinoInputComponent,
        ModalViajeIdaVueltaComponent,
      ],
      imports: [
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        MaterialModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
        {
          provide: AuthChecktripService,
          useValue: authServiceMock,
        },
        {
          provide: VuelosService,
          useValue: vuelosServiceMock,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AuthenticationService,
        VuelosService,
      ],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});
    fixture = TestBed.createComponent(ResultadoVuelosIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('verificar parametros', (done) => {
    expect(component.origen).toBe('BOG');
    expect(component.destino).toBe('CTG');
    expect(component.salida).toBe('2023-05-24');
    expect(component.vuelta).toBe('2023-06-02');
    expect(component.adultos).toBe('1');
    expect(component.infantes).toBe('0');
    expect(component.clase).toBe('ECONOMY');
    expect(component.vueloDirecto).toBe('true');
    done();
  });

  test('deberia asignarVuelosIdaVuelta', (done) => {
    let datos: any = retornarDatos(1);
    component.viajes_salida.push(datos);
    component.viajes_vuelta.push(datos);
    component.asignarVuelosIdaVuelta();
    component.validarBusquedaVuelos();
    expect(component.viajes_salida.length).toBeGreaterThan(0);
    expect(component.viajes_vuelta.length).toBeGreaterThan(0);
    expect(component.viajes.length).toBeGreaterThan(0);
    done();
  });

  test('deberia asignarViajesSalidaVuelta', (done) => {
    let datos: any = retornarDatos(2);
    component.asignarViajesSalidaVuelta(datos, component.viajes_salida);
    expect(component.viajes_salida.length).toBeGreaterThan(0);
    done();
  });

  test('deberia buscarVuelosVuelta', (done) => {
    component.buscarVuelosVuelta();
    done();
  });

  test('deberia abrirInfoViaje', (done) => {
    let datos: any = retornarDatos(1);
    component.abrirInfoViaje(datos, datos);
    component.onDataChange(null);
    done();
  });

  test('deberia validarBusquedaVuelos', (done) => {
    component.validarBusquedaVuelos();
    done();
  });
});

function establecerParametros() {
  const mockActivatedRoute = {
    paramMap: of({
      get(param: string) {
        const params: any = {
          origen: 'BOG',
          destino: 'CTG',
          salida: '2023-05-24',
          vuelta: '2023-06-02',
          adultos: '1',
          infantes: '0',
          clase: 'ECONOMY',
          vueloDirecto: 'true',
        };

        return params[param];
      },
    }),
  };
  return mockActivatedRoute;
}

export function retornarDatos(opcion: number) {
  if (opcion == 1) {
    let datos = {
      itineraries: [
        {
          duration: 'PT5H52M',
          segments: [
            {
              departure: {
                iataCode: 'JFK',
                terminal: '4',
                at: new Date(),
              },
              arrival: {
                iataCode: 'BOG',
                terminal: '1',
                at: new Date(),
              },
              carrierCode: 'DL',
              number: '253',
              aircraft: {
                code: '757',
              },
              operating: {
                carrierCode: 'DL',
              },
              duration: 'PT5H52M',
              id: '4',
              numberOfStops: 0,
              blacklistedInEU: false,
            },
          ],
        },
      ],
      numberOfBookableSeats: 3,
      price: {
        currency: 'COP',
        total: '972000.00',
        base: '759200.00',
        fees: [
          {
            amount: '0.00',
            type: 'SUPPLIER',
          },
          {
            amount: '0.00',
            type: 'TICKETING',
          },
        ],
        grandTotal: '972000.00',
      },
      dictionaries: {
        locations: {
          EWR: {
            cityCode: 'NYC',
            countryCode: 'US',
          },
          BOG: {
            cityCode: 'BOG',
            countryCode: 'CO',
          },
          JFK: {
            cityCode: 'NYC',
            countryCode: 'US',
          },
        },
        aircraft: {
          '319': 'AIRBUS A319',
          '757': 'BOEING 757',
          '73G': 'BOEING 737-700',
          '32N': 'AIRBUS A320NEO',
        },
        currencies: {
          COP: 'COLOMBIAN PESO',
        },
        carriers: {
          LA: 'LATAM AIRLINES GROUP',
          AV: 'AVIANCA',
          DL: 'DELTA AIR LINES',
          UA: 'UNITED AIRLINES',
        },
      },
    };
    return datos;
  } else {
    let datos: Viajes = {
      data: [
        {
          itineraries: [
            {
              duration: 'PT5H52M',
              segments: [
                {
                  departure: {
                    iataCode: 'JFK',
                    terminal: '4',
                    at: new Date(),
                  },
                  arrival: {
                    iataCode: 'BOG',
                    terminal: '1',
                    at: new Date(),
                  },
                  carrierCode: 'DL',
                  number: '253',
                  aircraft: {
                    code: '757',
                  },
                  operating: {
                    carrierCode: 'DL',
                  },
                  duration: 'PT5H52M',
                  id: '4',
                  numberOfStops: 0,
                  blacklistedInEU: false,
                },
              ],
            },
          ],
          numberOfBookableSeats: 3,
          price: {
            currency: 'COP',
            total: '972000.00',
            base: '759200.00',
            fees: [
              {
                amount: '0.00',
                type: 'SUPPLIER',
              },
              {
                amount: '0.00',
                type: 'TICKETING',
              },
            ],
            grandTotal: '972000.00',
          },
        },
      ],
      meta: {
        count: 2,
      },
      dictionaries: {
        locations: {
          BCN: {
            cityCode: '5',
            countryCode: 'CO',
          },
          MAD: {
            cityCode: '6',
            countryCode: 'CO',
          },
        },
        aircraft: {
          '320': 'BOEING',
        },
        carriers: {
          IB: 'IB',
        },
        currencies: {
          USD: 'USD',
        },
      },
    };
    return datos;
  }
}
