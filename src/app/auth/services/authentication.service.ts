import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.client_id);
    body.set('client_secret', environment.client_secret);

    return this.http.post(
      environment.url_api_token,
      body.toString(),
      httpOptions
    );
  }

  guardarToken(token_amaedus: any, token_checktrip: any) {
    sessionStorage.setItem('token', token_amaedus.access_token);
    sessionStorage.setItem('token_checktrip', token_checktrip.token);
    sessionStorage.setItem('username', token_checktrip.username);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getTokenChecktrip() {
    return sessionStorage.getItem('token_checktrip');
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '/';
  }
}
