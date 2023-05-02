import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElegirCiudadesComponent } from './modal-elegir-ciudades.component';

describe('ModalElegirCiudadesComponent', () => {
  let component: ModalElegirCiudadesComponent;
  let fixture: ComponentFixture<ModalElegirCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalElegirCiudadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalElegirCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
