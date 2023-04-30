import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  hideNavbar: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.router.url === '/login') {
        this.hideNavbar = true;
      } else {
        this.hideNavbar = false;
      }
    });
  }

  cerrarSesion(){
    this.authenticationService.logout();
  }
}
