import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Datum } from '../../interfaces/vuelos.interface';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-ciudad-destino-input',
  templateUrl: './ciudad-destino-input.component.html',
  styleUrls: ['./ciudad-destino-input.component.css'],
})
export class CiudadDestinoInputComponent {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() ciudades: Datum[] = [];
  termino: string = '';
  @Output() onEnterDestino: EventEmitter<string> = new EventEmitter();
  @Output() onDebounceDestino: EventEmitter<string> = new EventEmitter();
  @Output() onSelectedDestino: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit() {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounceDestino.emit(valor);
    });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  buscar() {
    this.onEnterDestino.emit(this.termino);
  }

  emitir_opcion_seleccionada(event: any) {
    this.onSelectedDestino.emit(event.target.value);
  }
}
