import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthChecktripService } from '../../services/auth-checktrip.service';
import { AuthenticationService } from '../../services/authentication.service';

import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let authenticationServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      loginChecktrip: jest.fn(),
    };
    authenticationServiceMock = {
      login: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
