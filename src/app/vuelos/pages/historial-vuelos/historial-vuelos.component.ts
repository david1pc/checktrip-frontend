import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VuelosService } from '../../services/vuelos.service';

@Component({
  selector: 'app-historial-vuelos',
  templateUrl: './historial-vuelos.component.html',
  styleUrls: ['./historial-vuelos.component.css']
})
export class HistorialVuelosComponent {

  formulario: FormGroup;
  vuelos: any[] = [];
  yaBusco: boolean = false;

  constructor(
    private router: Router,
    private formBuider: FormBuilder,
    private vuelosService: VuelosService
  ) {
    this.formulario = this.formBuider.group({
      fechaSalida: ['', [Validators.required]],
      fechaVuelta: ['', []],
      username: ['']
    });

    let user:string | null = sessionStorage.getItem('username') ?? null;
    this.formulario.get('username')?.setValue(user);
  }

  ngOnInit(): void {
    let historialVuelos = localStorage.getItem("historial_vuelos");
    this.vuelos = historialVuelos ? JSON.parse(historialVuelos) : [];
  }

  consultar() {
    if (this.formulario.valid) {
      this.yaBusco = true;
      let value: any = this.formulario.value;
      this.vuelosService
        .filtrarHistorial(value.fechaSalida,value.fechaVuelta, value.username)
        .subscribe({
          next: (response) => {
            this.vuelos = response;
            localStorage.setItem("historial_vuelos", JSON.stringify(this.vuelos));
          },
        });
    }
  }

  detalleHistorial(id:number) {
    this.router.navigate(['vuelos/detalle_historial_vuelos/',id])
    .then(() => {})
    .catch(() => {});
  }

}