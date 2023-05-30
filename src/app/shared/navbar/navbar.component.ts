import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  hideNavbar: boolean = false;
  username: string | null = '';
  seleccion_divisa: string = '';
  countdownValue: number = 0;
  seAsignoTimer!: boolean;
  interval: any;
  seconds = Number(sessionStorage.getItem('expires_in')) ?? 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.verificarUrl();
    });
    if (!sessionStorage.getItem('divisa')) {
      sessionStorage.setItem('divisa', 'COP');
    }
    this.seleccion_divisa = sessionStorage.getItem('divisa') ?? 'COP';
    this.username = sessionStorage.getItem('username') ?? null;

    if (this.seconds > 0) {
      this.countdownValue = this.seconds;

      timer(0, this.countdownValue).subscribe((val: any) => {
        this.countdownValue -= 1;
        sessionStorage.setItem('expires_in', this.countdownValue.toString());
      });
    }
  }

  verificarUrl() {
    if (this.router.url === '/login') {
      this.hideNavbar = true;
    } else {
      this.hideNavbar = false;
    }
  }

  cambiarDivisa(divisa: string) {
    sessionStorage.setItem('divisa', divisa);
    this.seleccion_divisa = divisa;
  }

  cerrarSesion() {
    this.authenticationService.logout();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  stopCountdown(): void {
    clearInterval(this.interval);
  }

  recargarPagina() {
    window.location.reload();
  }

  formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
