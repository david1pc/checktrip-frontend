import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BusquedaVuelosComponent } from './busqueda-vuelos.component';
import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { HttpClientModule } from '@angular/common/http';
import { VuelosService } from '../../../../../src/app/vuelos/services/vuelos.service';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

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

  afterEach(() => {
    routerSpy.mockRestore();
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
});