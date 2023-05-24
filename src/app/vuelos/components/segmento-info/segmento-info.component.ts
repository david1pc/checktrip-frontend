import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-segmento-info',
  templateUrl: './segmento-info.component.html',
  styleUrls: ['./segmento-info.component.css'],
})
export class SegmentoInfoComponent {
  @Input() segmento: any;
  @Input() viaje: any;
  @Input() clase: any;

  obtenerAerolinea(segmento: any) {
    for (let item of this.viaje.dictionaries.carriers) {
      if (item.id == segmento.carrierCode) {
        return item.name;
      }
    }
  }

  obtenerAvion(segmento: any) {
    for (let item of this.viaje.dictionaries.aircraft) {
      if (item.code == segmento.aircraft.id) {
        return item.name;
      }
    }
  }
}
