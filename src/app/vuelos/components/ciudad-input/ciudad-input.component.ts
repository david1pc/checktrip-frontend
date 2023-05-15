import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Datum } from '../../interfaces/vuelos.interface';

@Component({
  selector: 'app-ciudad-input',
  templateUrl: './ciudad-input.component.html',
  styleUrls: ['./ciudad-input.component.css'],
})
export class CiudadInputComponent {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() ciudades: Datum[] = [];
  @Input() termino: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onSelected: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit() {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  emitir_opcion_seleccionada(event: any) {
    this.onSelected.emit(event.target.value);
  }
}
