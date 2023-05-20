import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VuelosService } from '../services/vuelos.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../auth/services/auth.interceptor.ts';

describe('VuelosService', () => {
  let vuelosService: VuelosService;
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        VuelosService,
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    })
      .compileComponents()
      .then(() => {})
      .catch(() => {});
    vuelosService = TestBed.inject(VuelosService);
    authenticationService = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería llamar a login y utilizar el token en las siguientes solicitudes', (done) => {
    authenticationService.login().subscribe((resp) => {
      authenticationService.guardarToken(resp, '12345');
    });
    const httpRequest = httpMock.expectOne(
      `https://test.api.amadeus.com/v1/security/oauth2/token`
    );
    expect(httpRequest.request.method).toBe('POST');
    const mockResponse = {
      respuesta: 'exito',
    };
    httpRequest.flush(mockResponse);
    done();
  });

  test('deberia buscar ciudad Armenia', (done) => {
    vuelosService.buscarCiudadesVuelos('Armenia').subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.data[0].iataCode).toBe('AXM');
    });
    const httpRequest = httpMock.expectOne(
      `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=Armenia&max=5`
    );
    expect(httpRequest.request.method).toBe('GET');
    const mockResponse = {
      respuesta: 'exito',
    };
    httpRequest.flush(mockResponse);
    done();
  });

  test('deberia buscar ofertas', (done) => {
    vuelosService
      .flightOffers('AXM', 'BOG', '2023-06-25', '1', '0', 'ECONOMY', 'true')
      .subscribe((response) => {
        expect(response).toHaveBeenCalled();
        expect(response.data[0].itineraries[0].segments.length).toBe(1);
      });
    const httpRequest = httpMock.expectOne(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AXM&destinationLocationCode=BOG&departureDate=2023-06-25&adults=1&children=0&nonStop=true&currencyCode=COP&max=250&travelClass=ECONOMY`
    );
    expect(httpRequest.request.method).toBe('GET');
    const mockResponse = {
      respuesta: 'exito',
    };
    httpRequest.flush(mockResponse);
    done();
  });
});
