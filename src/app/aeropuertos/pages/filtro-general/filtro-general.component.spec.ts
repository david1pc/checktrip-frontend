import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CiudadDestinoInputComponent } from '../../../../../src/app/vuelos/components/ciudad-destino-input/ciudad-destino-input.component';
import { CiudadInputComponent } from '../../../../../src/app/vuelos/components/ciudad-input/ciudad-input.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { FiltroGeneralComponent } from './filtro-general.component';
import { AirportCitySearchService } from '../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { ModalAuthComponent } from '../../../../../src/app/auth/components/modal-auth/modal-auth.component';

describe('FiltroGeneralComponent', () => {
  let component: FiltroGeneralComponent;
  let fixture: ComponentFixture<FiltroGeneralComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FiltroGeneralComponent,
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
        AuthenticationService,
        Router,
        AirportCitySearchService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should consultar', (done) => {
    component.formulario.controls['keyword'].setValue('Armenia');
    fixture.detectChanges();
    let registro: any = {
      nombre: 'El Eden',
      codigo: 'AXM',
      address: {
        cityName: 'Armenia',
        coucountryName: 'Colombia',
      },
    };
    component.estructurarDatos([registro]);
    component.consultar();
    component.verCiudadesDestinos('Armenia', 'AXM');
    done();
  });
});
