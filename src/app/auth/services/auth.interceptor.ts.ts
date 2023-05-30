import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // cuando consuma el servicio de token no configura los headers
    if (
      request.url.includes('oauth2') ||
      this.authenticationService.getToken() == null
    ) {
      return next.handle(request);
    }

    // Obtiene el token de autenticación de tu fuente preferida
    let token = this.authenticationService.getToken();

    if (request.url.includes('api/itinerary')) {
      token = this.authenticationService.getTokenChecktrip();
    }

    // Clona la solicitud para agregar el encabezado Authorization con el token
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    // Envía la solicitud con el encabezado Authorization agregado
    //return next.handle(authReq);
    return next.handle(authReq).pipe(
      finalize(() => {}),
      catchError((err) => {
        console.log(err);
        if ([401, 0].includes(err.status)) {
          this.verModalError('Su sesión ha finalizado');
        }
        return throwError(() => {});
      })
    );
  }

  verModalError(mensaje: string) {
    Swal.fire({
      title: 'Sesion expirada',
      text: mensaje,
      icon: 'info',
      didOpen: () => {
        setInterval(() => {
          this.authenticationService.logout();
        }, 4000);
      },
    })
      .then(() => {
        this.authenticationService.logout();
      })
      .catch(() => {});
  }
}
