import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoVuelosIdaVueltaComponent } from './resultado-vuelos-ida-vuelta.component';

describe('ResultadoVuelosIdaVueltaComponent', () => {
  let component: ResultadoVuelosIdaVueltaComponent;
  let fixture: ComponentFixture<ResultadoVuelosIdaVueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoVuelosIdaVueltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoVuelosIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
