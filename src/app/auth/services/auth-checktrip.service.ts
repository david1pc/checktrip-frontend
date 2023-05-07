import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../interfaces/auth.interface';
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
}
