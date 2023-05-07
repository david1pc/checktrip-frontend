import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
})
export class ModalAuthComponent {
  @Input() data: any;

  constructor(public modal: NgbActiveModal, private router: Router) {}
}
