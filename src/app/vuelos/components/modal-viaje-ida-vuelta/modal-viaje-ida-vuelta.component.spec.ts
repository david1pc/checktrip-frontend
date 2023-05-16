import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViajeIdaVueltaComponent } from './modal-viaje-ida-vuelta.component';

describe('ModalViajeIdaVueltaComponent', () => {
  let component: ModalViajeIdaVueltaComponent;
  let fixture: ComponentFixture<ModalViajeIdaVueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViajeIdaVueltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViajeIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
