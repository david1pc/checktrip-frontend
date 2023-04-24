import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authenticationService: AuthenticationService){
  }

  login(){
    this.authenticationService.login().subscribe({
      next: (response) => {
        this.authenticationService.guardarToken(response);
        console.log("se guardo el token en sesion correctamente");
      },
    });
  }

  cerrarSesion(){
    this.authenticationService.logout();
  }
}
