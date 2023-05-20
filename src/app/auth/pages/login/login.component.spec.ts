import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../../src/app/auth/services/auth.interceptor.ts';

import { SharedModule } from '../../../shared/shared.module';
import { of } from 'rxjs';
import { ModalAuthComponent } from '../../../../../src/app/auth/components/modal-auth/modal-auth.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    authenticationServiceMock = {
      login: jest.fn(),
      guardarToken: jest.fn(),
    };

    authServiceMock = {
      loginChecktrip: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, ModalAuthComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
        {
          provide: AuthChecktripService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should post loginChecktrip', (done) => {
    const expectResponse = {
      username: 'david12',
    };
    const username = 'david12';
    const wd = '12345';
    component.formulario.controls['username'].setValue(username);
    component.formulario.controls['password'].setValue(wd);
    fixture.detectChanges();
    jest
      .spyOn(authenticationServiceMock, 'login')
      .mockReturnValue(of(expectResponse));
    jest
      .spyOn(authServiceMock, 'loginChecktrip')
      .mockReturnValue(of(expectResponse));
    jest
      .spyOn(authenticationServiceMock, 'guardarToken')
      .mockReturnValue(of(expectResponse));
    component.login();
    expect(authenticationServiceMock.login).toHaveBeenCalled();
    expect(authServiceMock.loginChecktrip).toHaveBeenCalled();
    done();
  });

  test('deberia verModalError', (done) => {
    component.verModalError({ status: 426 });
    component.verModalError({ status: 400 });
    done();
  });
});
