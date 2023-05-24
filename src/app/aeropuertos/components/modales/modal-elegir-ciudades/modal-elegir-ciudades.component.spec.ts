import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../../../../src/app/auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../../src/app/auth/services/auth.interceptor.ts';
import { SharedModule } from '../../../../../../src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ModalElegirCiudadesComponent } from './modal-elegir-ciudades.component';
import { AirportCitySearchService } from '../../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { ModalAuthComponent } from '../../../../../../src/app/auth/components/modal-auth/modal-auth.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

describe('ModalElegirCiudadesComponent', () => {
  let component: ModalElegirCiudadesComponent;
  let fixture: ComponentFixture<ModalElegirCiudadesComponent>;
  let routerSpy: jest.SpyInstance;
  beforeEach(async () => {
    routerSpy = jest
      .spyOn(Router.prototype, 'navigate')
      .mockResolvedValue(true);
    await TestBed.configureTestingModule({
      declarations: [ModalElegirCiudadesComponent, ModalAuthComponent],
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

  afterEach(() => {
    routerSpy.mockRestore();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalElegirCiudadesComponent);
    component = fixture.componentInstance;
    component.data = {
      codigo: 'BOG',
      nombre: 'Bogota',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should buscarVuelos', (done) => {
    component.formulario.controls['codigoDestino'].setValue('BOG');
    component.formulario.controls['nombreDestino'].setValue('Bogota');

    fixture.detectChanges();

    let registro: any = {
      name: 'Bogota',
      iataCode: 'BOG',
    };
    component.estructurarDatos([registro]);
    component.changeDestino('Bogota', 'BOG');
    component.consultarCiudadesDestino('BOG');
    component.buscarVuelos();
    expect(routerSpy).toHaveBeenCalled();
    done();
  });
});
