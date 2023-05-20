import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BusquedaVuelosComponent } from './busqueda-vuelos.component';
import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { VuelosService } from '../../../../../src/app/vuelos/services/vuelos.service';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { Busqueda, Datum } from '../../interfaces/vuelos.interface';

describe('LoginComponent', () => {
  let component: BusquedaVuelosComponent;
  let fixture: ComponentFixture<BusquedaVuelosComponent>;
  let routerSpy: jest.SpyInstance;
  beforeEach(async () => {
    routerSpy = jest
      .spyOn(Router.prototype, 'navigate')
      .mockResolvedValue(true);
    await TestBed.configureTestingModule({
      declarations: [
        BusquedaVuelosComponent,
        CiudadInputComponent,
        CiudadDestinoInputComponent,
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
        VuelosService,
        AuthenticationService,
        Router,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    routerSpy.mockRestore();
  });

  it('Should post loginChecktrip', (done) => {
    component.formulario.controls['ciudadOrigen'].setValue('AXM');
    component.formulario.controls['ciudadDestino'].setValue('BOG');
    component.formulario.controls['fecha_salida'].setValue('2023-05-26');
    component.formulario.controls['fecha_vuelta'].setValue('2023-06-04');
    component.formulario.controls['cantidadInfantes'].setValue('0');
    component.formulario.controls['tipoVuelo'].setValue('idavuelta');
    component.formulario.controls['travelClass'].setValue('ECONOMY');
    component.formulario.controls['vueloDirecto'].setValue(true);
    component.buscarVuelo();
    component.seleccionar_ciudad_destino('Armenia(AXM)');
    component.seleccionar_ciudad_origen('Bogota(BOG)');
    component.buscarCiudadDestino('Armenia');
    component.buscarCiudadOrigen('Bogota');
    component.validarTipoVuelo();
    component.cambiarTipo({
      target: {
        value: 'ida',
      },
    });

    fixture.detectChanges();

    expect(component.termino_destino).toBe('Armenia');
    expect(component.termino_origen).toBe('Bogota');

    expect(component.ciudadDestino).toBe('AXM');
    expect(component.busqueda_destino).toBe('Armenia(AXM)');

    expect(component.ciudadOrigen).toBe('BOG');
    expect(component.busqueda_origen).toBe('Bogota(BOG)');

    expect(component.formulario.controls['ciudadOrigen'].value).toBe('AXM');
    expect(routerSpy).toHaveBeenCalled();
    done();
  });

  test('deberia establecerValoresSesion', (done) => {
    component.establecerValoresSesion();
    done();
  });

  test('deberia asignarCiudades', (done) => {
    let datos: Datum[] = [
      {
        type: 'location',
        subType: 'city',
        name: 'Cartago',
        iataCode: 'CRC',
        address: {
          countryCode: 'CO',
          stateCode: 'CO-ZZZ',
        },
        geoCode: {
          latitude: 4.74639,
          longitude: -75.91167,
        },
      },
      {
        type: 'location',
        subType: 'city',
        name: 'Cartagena',
        iataCode: 'CTG',
        address: {
          countryCode: 'CO',
          stateCode: 'CO-ZZZ',
        },
        geoCode: {
          latitude: 10.39972,
          longitude: -75.51444,
        },
      },
      {
        type: 'location',
        subType: 'city',
        name: 'Cartagena',
        iataCode: 'XUF',
        address: {
          countryCode: 'ES',
          stateCode: 'ES-ZZZ',
        },
        geoCode: {
          latitude: 37.60512,
          longitude: -0.98623,
        },
      },
    ];
    let busqueda: Busqueda = {
      data: datos,
      meta: {
        count: 5,
      },
    };
    component.asignarCiudades(busqueda, datos);
    done();
  });
});
