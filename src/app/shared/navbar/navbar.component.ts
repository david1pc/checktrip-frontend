import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  hideNavbar: boolean = false;
  username: string | null = '';
  seleccion_divisa: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login') {
        this.hideNavbar = true;
      } else {
        this.hideNavbar = false;
      }
    });
    if (!sessionStorage.getItem('divisa')) {
      sessionStorage.setItem('divisa', 'COP');
    }
    this.seleccion_divisa = sessionStorage.getItem('divisa') || 'COP';
    this.username = sessionStorage.getItem('username') || null;
  }

  cambiarDivisa(divisa: string) {
    sessionStorage.setItem('divisa', divisa);
    this.seleccion_divisa = divisa;
  }

  cerrarSesion() {
    this.authenticationService.logout();
  }
}
