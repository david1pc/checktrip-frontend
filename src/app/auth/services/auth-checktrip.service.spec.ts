import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthChecktripService } from '../../../../src/app/auth/services/auth-checktrip.service';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('AuthChecktripService', () => {
  let authenticationService: AuthChecktripService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [AuthChecktripService],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});
    authenticationService = TestBed.inject(AuthChecktripService);
  });

  it('should post recuperacionCuenta', () => {
    let status = 200;

    const correo = 'davidprueba50@email.com';
    authenticationService.recuperacionCuenta(correo).subscribe((resp) => {
      expect(resp).toBe(status);
    });
  });

  it('should post restaurarPasswordCuenta', () => {
    const correo = 'david1pc4@gmail.com';
    const aw = '12345';
    const aw2 = '123456';

    let status = 200;

    authenticationService
      .restaurarPasswordCuenta(correo, aw, aw2)
      .subscribe((resp) => {
        expect(resp).toBe(status);
      });
  });

  it('Should post loginChecktrip', () => {
    let status = 200;
    const username = 'david12';
    const wd = '12345';
    authenticationService.loginChecktrip(username, wd).subscribe((resp) => {
      expect(resp).toBe(status);
    });
  });
});
