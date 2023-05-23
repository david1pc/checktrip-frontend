import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVuelosComponent } from './historial-vuelos.component';

describe('HistorialVuelosComponent', () => {
  let component: HistorialVuelosComponent;
  let fixture: ComponentFixture<HistorialVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialVuelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
