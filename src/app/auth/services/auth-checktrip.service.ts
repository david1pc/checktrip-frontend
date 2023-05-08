import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountRecoveryRequest,
  ClientPasswdRequest,
  ClientRequest,
  Login,
  LoginResponse,
} from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthChecktripService {
  constructor(private http: HttpClient) {}

  loginChecktrip(username: string, password: string) {
    const loginDTO: Login = {
      username: username,
      password: password,
    };
    return this.http.post<any>(
      environment.url_api_checktrip + 'auth/login',
      loginDTO
    );
  }

  registroChecktrip(datosCliente: ClientRequest) {
    return this.http.post<any>(
      environment.url_api_checktrip + 'auth/register',
      datosCliente
    );
  }

  recuperacionCuenta(username: string) {
    const data: AccountRecoveryRequest = {
      correo: username,
    };
    return this.http.post<any>(
      environment.url_api_checktrip + 'auth/recover-account',
      data
    );
  }

  restaurarPasswordCuenta(
    username: string,
    password: string,
    newPassword: string
  ) {
    const data: ClientPasswdRequest = {
      username: username,
      newPassword: newPassword,
      password: password,
    };
    return this.http.post<any>(
      environment.url_api_checktrip + 'auth/update-passwd',
      data
    );
  }
}
