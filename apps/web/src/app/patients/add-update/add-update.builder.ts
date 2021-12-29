import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '@isee/api-interfaces';

@Injectable()
export class AddUpdateFormBuilder {
  constructor(private fb: FormBuilder) {}

  build(patient?: Patient): FormGroup {
    return this.fb.group({
      firstname: [patient ? patient.firstname : '', Validators.required],
      lastname: [patient ? patient.lastname : '', Validators.required],
      birthday: [patient ? patient.birthday : '', Validators.required],
      id_number: [patient ? patient.id_number : '', Validators.required],
      branch: [patient ? patient.branch : '', Validators.required],
      address: [patient ? patient.address : ''],
      disease: [patient ? patient.disease : ''],
    });
  }
}
