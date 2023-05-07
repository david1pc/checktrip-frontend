import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { AuthChecktripService } from '../../services/auth-checktrip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formulario: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private auth_checktrip: AuthChecktripService,
    private router: Router,
    private formBuider: FormBuilder
  ) {
    this.formulario = this.formBuider.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formulario.valid) {
      let value: any = this.formulario.value;
      this.authenticationService.login().subscribe({
        next: (response) => {
          this.auth_checktrip
            .loginChecktrip(value.username, value.password)
            .subscribe({
              next: (data) => {
                this.authenticationService.guardarToken(response, data);
                this.router.navigate(['/']);
              },
              error: (error) => {
                console.log(error);
              },
            });
        },
        error: (error) => {
          console.log('Error al iniciar sesion', error);
        },
      });
    }
  }
}
