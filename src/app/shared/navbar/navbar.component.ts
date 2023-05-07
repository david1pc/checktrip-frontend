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
    this.username = sessionStorage.getItem('username') || null;
  }

  cerrarSesion() {
    this.authenticationService.logout();
  }
}
