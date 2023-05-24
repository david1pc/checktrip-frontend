import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { BuscarVuelosComponent } from './buscar-vuelos.component';
import { AirportCitySearchService } from '../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { ModalAuthComponent } from '../../../../../src/app/auth/components/modal-auth/modal-auth.component';
import { of } from 'rxjs';

describe('FiltroGeneralComponent', () => {
  let component: BuscarVuelosComponent;
  let fixture: ComponentFixture<BuscarVuelosComponent>;
  beforeEach(async () => {
    const mockActivatedRoute = establecerParametros();
    await TestBed.configureTestingModule({
      declarations: [
        BuscarVuelosComponent,
        CiudadInputComponent,
        CiudadDestinoInputComponent,
        ModalAuthComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AuthenticationService,
        Router,
        AirportCitySearchService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('verificar parametros', (done) => {
    expect(component.codigoOrigen).toBe('BOG');
    expect(component.nombreOrigen).toBe('Bogota');
    expect(component.codigoDestino).toBe('CTG');
    expect(component.nombreDestino).toBe('Cartagena');
    done();
  });

  it('Should post consultar', (done) => {
    component.formulario.controls['originLocationCode'].setValue('BOG');
    component.formulario.controls['destinationLocationCode'].setValue('AXM');
    component.formulario.controls['departureDate'].setValue('2023-05-28');
    component.formulario.controls['adults'].setValue('5');
    component.formulario.controls['travelClass'].setValue('ECONOMY');

    fixture.detectChanges();
    let registro: any = {
      numberOfBookableSeats: 5,
      lastTicketingDateTime: '2023-05-28',
      price: {
        currency: 'COP',
        grandTotal: '10000',
      },
    };
    component.estructurarDatos([registro]);
    component.consultar();
    done();
  });
});

function establecerParametros() {
  const mockActivatedRoute = {
    paramMap: of({
      get(param: string) {
        const params: any = {
          param1: 'BOG',
          param2: 'Bogota',
          param3: 'CTG',
          param4: 'Cartagena',
        };

        return params[param];
      },
    }),
  };
  return mockActivatedRoute;
}
