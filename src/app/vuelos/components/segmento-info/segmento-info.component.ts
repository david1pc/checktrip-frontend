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
}
