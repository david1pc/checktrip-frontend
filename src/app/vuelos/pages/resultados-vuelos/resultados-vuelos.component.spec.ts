import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ResultadosVuelosComponent } from '../../../../../src/app/vuelos/pages/resultados-vuelos/resultados-vuelos.component';
import { BusquedaVuelosComponent } from '../../../../../src/app/vuelos/components/busqueda-vuelos/busqueda-vuelos.component';
import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { VuelosService } from '../../../../../src/app/vuelos/services/vuelos.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../../src/app/auth/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../../src/app/material/material.module';
import { ModalViajeComponent } from '../../../../../src/app/vuelos/components/modal-viaje/modal-viaje.component';
import { of } from 'rxjs';
import { retornarDatos } from '../../../../../src/app/vuelos/pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component.spec';

describe('ResultadosVuelosComponent', () => {
  let component: ResultadosVuelosComponent;
  let fixture: ComponentFixture<ResultadosVuelosComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = establecerParametros();

    await TestBed.configureTestingModule({
      declarations: [
        ResultadosVuelosComponent,
        BusquedaVuelosComponent,
        CiudadInputComponent,
        ModalViajeComponent,
        CiudadDestinoInputComponent,
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AuthenticationService,
        VuelosService,
      ],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});

    fixture = TestBed.createComponent(ResultadosVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('verificar parametros', (done) => {
    expect(component.origen).toBe('BOG');
    expect(component.destino).toBe('CTG');
    expect(component.salida).toBe('2023-05-24');
    expect(component.adultos).toBe('1');
    expect(component.infantes).toBe('0');
    expect(component.clase).toBe('ECONOMY');
    expect(component.vueloDirecto).toBe('true');
    done();
  });

  test('deberia asignarViajesSalida', (done) => {
    let datos: any = retornarDatos(2);
    component.validarBusquedaVuelos();
    component.asignarViajesSalida(datos, component.viajes);
    component.validarBusquedaVuelos();
    expect(component.viajes.length).toBeGreaterThan(0);
    done();
  });

  test('deberia abrirInfoViaje', (done) => {
    let datos: any = retornarDatos(1);
    component.abrirInfoViaje(datos);
    component.onDataChange(null);
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
