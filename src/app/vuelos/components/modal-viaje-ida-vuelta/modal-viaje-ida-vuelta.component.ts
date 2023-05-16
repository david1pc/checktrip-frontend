import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-viaje-ida-vuelta',
  templateUrl: './modal-viaje-ida-vuelta.component.html',
  styleUrls: ['./modal-viaje-ida-vuelta.component.css'],
})
export class ModalViajeIdaVueltaComponent {
  @Input() data: any;

  constructor(public modal: NgbActiveModal, private router: Router) {}
}
