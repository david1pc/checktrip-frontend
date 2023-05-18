import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RecuperarCuentaComponent } from './recuperar-cuenta.component';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { AuthenticationService } from '../../services/authentication.service';

import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { HttpResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: RecuperarCuentaComponent;
  let fixture: ComponentFixture<RecuperarCuentaComponent>;
  let authServiceMock: any;
  let authenticationServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      recuperacionCuenta: jest.fn(),
    };
    authenticationServiceMock = {
      login: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [RecuperarCuentaComponent],
      imports: [RouterTestingModule, SharedModule, ReactiveFormsModule],
      providers: [
        {
          provide: AuthChecktripService,
          useValue: authServiceMock,
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post recuperacionCuenta', () => {
    const correo = 'davidprueba50@email.com';
    component.formulario.controls['correo'].setValue(correo);
    const resp = new HttpResponse({
      status: 200,
    });
    jest.spyOn(authServiceMock, 'recuperacionCuenta').mockReturnValue(of(resp));
    component.recuperarCuenta();
  });
});
