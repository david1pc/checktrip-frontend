import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }

    login(): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          };
        
          const body = new URLSearchParams();
          body.set('grant_type', 'client_credentials');
          body.set('client_id',  environment.client_id);
          body.set('client_secret', environment.client_secret);
        
          return this.http.post(environment.url_api_token, body.toString(), httpOptions);
    }

    guardarToken(data: any){
        sessionStorage.setItem('token', data.access_token);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.clear();
        window.location.href = "/";
    }
}
