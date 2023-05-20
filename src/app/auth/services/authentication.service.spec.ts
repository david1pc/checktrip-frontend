import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from '../../../../src/app/auth/services/authentication.service';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('AuthChecktripService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [AuthenticationService],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should post login', () => {
    let status = 200;

    authenticationService.login().subscribe((resp) => {
      expect(resp).toBe(status);
    });
  });

  it('should guardarToken', () => {
    const tokenAmadeus = {
      access_token: '123456',
    };
    const tokenCheckTrip = {
      token: '123456',
    };

    authenticationService.guardarToken(tokenAmadeus, tokenCheckTrip);
  });

  it('Should getToken', () => {
    authenticationService.getToken();
  });

  it('Should logout', () => {
    authenticationService.logout();
  });
});
