import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router){
  }

  login() {
    this.authenticationService.login().subscribe({
      next: (response) => {
        this.authenticationService.guardarToken(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log("Error al iniciar sesion", error);
      }
    });
  }
  
}
