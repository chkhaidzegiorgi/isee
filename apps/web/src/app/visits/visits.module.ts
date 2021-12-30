import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsService } from './visits.service';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUpdateComponent } from './add-update/add-update.component';
import { AddUpdateFormBuilder } from './add-update/add-update.builder';
import { MatTimepickerModule } from 'mat-timepicker';
import { DoctorsService } from '../services/doctors.service';
import { PatientsService } from '../patients/patients.service';

@NgModule({
  declarations: [ListComponent, AddUpdateComponent],
  imports: [
    CommonModule,
    VisitsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTimepickerModule,
  ],
  providers: [
    PatientsService,
    DoctorsService,
    VisitsService,
    AddUpdateFormBuilder,
  ],
})
export class VisitsModule {}
