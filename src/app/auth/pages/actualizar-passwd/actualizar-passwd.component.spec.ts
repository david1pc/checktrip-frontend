import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ActualizarPasswdComponent } from './actualizar-passwd.component';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalAuthComponent } from '../../../../../src/app/auth/components/modal-auth/modal-auth.component';

import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { HttpResponse } from '@angular/common/http';

describe('ActualizarPasswdComponent', () => {
  let component: ActualizarPasswdComponent;
  let fixture: ComponentFixture<ActualizarPasswdComponent>;
  let authServiceMock: any;
  let authenticationServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      recuperacionCuenta: jest.fn(),
      restaurarPasswordCuenta: jest.fn(),
    };
    authenticationServiceMock = {
      login: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ActualizarPasswdComponent, ModalAuthComponent],
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
    fixture = TestBed.createComponent(ActualizarPasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post recuperacionCuenta', () => {
    const resp = new HttpResponse({
      status: 200,
    });

    const correo = 'davidprueba50@email.com';
    jest.spyOn(authServiceMock, 'recuperacionCuenta').mockReturnValue(of(resp));
    authServiceMock.recuperacionCuenta(correo);
  });

  it('should post restaurarPasswordCuenta', () => {
    const correo = 'david1pc4@gmail.com';
    const aw = '12345';
    const aw2 = '123456';

    component.formulario.controls['username'].setValue(correo);
    component.formulario.controls['password'].setValue(aw);
    component.formulario.controls['newPassword'].setValue(aw2);

    const resp = new HttpResponse({
      status: 200,
    });

    jest
      .spyOn(authServiceMock, 'restaurarPasswordCuenta')
      .mockReturnValue(of(resp));
    component.actualizar_cuenta();
  });

  test('deberia verModal', (done) => {
    component.verModal('Error', 'Actualizar contraseña');
    done();
  });
});
