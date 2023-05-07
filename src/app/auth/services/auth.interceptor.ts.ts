import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

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
    const token = this.authenticationService.getToken();

    // Clona la solicitud para agregar el encabezado Authorization con el token
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    // Envía la solicitud con el encabezado Authorization agregado
    //return next.handle(authReq);
    return next.handle(authReq).pipe(
      finalize(() => {}),
      catchError((err) => {
        if ([401].includes(err.status)) {
          this.authenticationService.logout();
        }
        return throwError(err);
      })
    );
  }
}
