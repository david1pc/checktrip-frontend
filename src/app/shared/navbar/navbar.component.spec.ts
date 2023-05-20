import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';
import { AuthChecktripService } from '../../../../src/app/auth/services/auth-checktrip.service';
import { AuthenticationService } from '../../../../src/app/auth/services/authentication.service';

import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: any;
  let authenticationServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = {
      recuperacionCuenta: jest.fn(),
      restaurarPasswordCuenta: jest.fn(),
    };
    authenticationServiceMock = {
      login: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
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
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verificarUrl', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/login');
    fixture.detectChanges();
    component.verificarUrl();
    jest.spyOn(router, 'url', 'get').mockReturnValue('/hola');
    fixture.detectChanges();
    component.verificarUrl();
  });

  it('should cambiarDivisa', () => {
    component.cambiarDivisa('USD');
    expect(component.seleccion_divisa).toBe('USD');
  });
});
