import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthChecktripService } from './auth-checktrip.service';
import { AuthenticationService } from './authentication.service';

import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { HttpResponse } from '@angular/common/http';
import { ClientRequest } from '../interfaces/auth.interface';

describe('AuthChecktripService', () => {
  let authServiceMock: any;
  let authenticationServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      recuperacionCuenta: jest.fn(),
      restaurarPasswordCuenta: jest.fn(),
      loginChecktrip: jest.fn(),
      registroChecktrip: jest.fn(),
    };
    authenticationServiceMock = {
      login: jest.fn(),
    };

    await TestBed.configureTestingModule({
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

    const resp = new HttpResponse({
      status: 200,
    });

    jest
      .spyOn(authServiceMock, 'restaurarPasswordCuenta')
      .mockReturnValue(of(resp));
    authServiceMock.restaurarPasswordCuenta(correo, aw, aw2);
  });

  it('Should post loginChecktrip', () => {
    const resp = {
      username: 'david12',
    };
    const username = 'david12';
    const wd = '12345';
    jest.spyOn(authServiceMock, 'loginChecktrip').mockReturnValue(of(resp));
    authServiceMock.loginChecktrip(username, wd);
  });
});
