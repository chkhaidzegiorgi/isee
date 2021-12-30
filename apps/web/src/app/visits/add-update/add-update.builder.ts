import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visit } from '@isee/api-interfaces';

@Injectable()
export class AddUpdateFormBuilder {
  constructor(private fb: FormBuilder) {}

  build(visit?: Visit): FormGroup {
    return this.fb.group({
      patient: [visit ? visit.patient : '', Validators.required],
      doctorId: [visit ? visit.doctorId : '', Validators.required],
      visit_date: [visit ? new Date(visit.visit_date) : '', Validators.required],
      visit_time: [visit ? new Date(visit.visit_date) : ''],
      price: [visit ? visit.price : '', Validators.required],
    });
  }
}
