import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../../../src/app/auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';
import { SharedModule } from '../../../../../src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ModalViajeIdaVueltaComponent } from './modal-viaje-ida-vuelta.component';
import { AirportCitySearchService } from '../../../../../src/app/aeropuertos/services/airport-city-search.service';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { retornarDatos } from '../../pages/resultado-vuelos-ida-vuelta/resultado-vuelos-ida-vuelta.component.spec';
import { SegmentoInfoComponent } from '../../../../../src/app/vuelos/components/segmento-info/segmento-info.component';

describe('ModalViajeIdaVueltaComponent', () => {
  let component: ModalViajeIdaVueltaComponent;
  let fixture: ComponentFixture<ModalViajeIdaVueltaComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViajeIdaVueltaComponent, SegmentoInfoComponent],
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
    fixture = TestBed.createComponent(ModalViajeIdaVueltaComponent);
    component = fixture.componentInstance;
    let datos: any = retornarDatos(1);
    component.data = {
      origen: 'BOG',
      destino: 'CTG',
      viaje_salida: datos,
      viaje_vuelta: datos,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should guardarItinerario', (done) => {
    component.estructurarDatos();
    component.guardarItinerario();
    component.verModal('modalItinerario');
    component.verModalError('modalError');
    done();
  });
});
