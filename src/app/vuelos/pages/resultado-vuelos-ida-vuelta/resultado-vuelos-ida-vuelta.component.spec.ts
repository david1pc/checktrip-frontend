import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { ResultadoVuelosIdaVueltaComponent } from '../../../../../src/app/vuelos/pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component';
import { BusquedaVuelosComponent } from '../../../../../src/app/vuelos/components/busqueda-vuelos/busqueda-vuelos.component';
import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { VuelosService } from '../../../../../src/app/vuelos/services/vuelos.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../../src/app/auth/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../../src/app/material/material.module';
import { of } from 'rxjs';

describe('ResultadoVuelosIdaVueltaComponent', () => {
  let component: ResultadoVuelosIdaVueltaComponent;
  let fixture: ComponentFixture<ResultadoVuelosIdaVueltaComponent>;

  test('debe de tener el valores iniciales del vuelo', async () => {
    let origen_prueba: string = 'BOG';
    const mockActivatedRoute = {
      paramMap: of({
        get(param: string) {
          const params: any = {
            origen: origen_prueba,
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

    await TestBed.configureTestingModule({
      declarations: [
        ResultadoVuelosIdaVueltaComponent,
        BusquedaVuelosComponent,
        CiudadInputComponent,
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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        AuthenticationService,
        VuelosService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoVuelosIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.origen).toBe(origen_prueba);
  });
});
