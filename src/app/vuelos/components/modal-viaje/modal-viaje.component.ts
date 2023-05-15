import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-viaje',
  templateUrl: './modal-viaje.component.html',
  styleUrls: ['./modal-viaje.component.css'],
})
export class ModalViajeComponent {
  @Input() data: any;

  constructor(public modal: NgbActiveModal, private router: Router) {}
}
