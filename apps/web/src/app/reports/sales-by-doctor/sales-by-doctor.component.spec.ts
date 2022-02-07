import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByDoctorComponent } from './sales-by-doctor.component';

describe('SalesByDoctorComponent', () => {
  let component: SalesByDoctorComponent;
  let fixture: ComponentFixture<SalesByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
