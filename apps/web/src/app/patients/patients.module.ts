import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../shared/material.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsService } from './patients.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [PatientsService],
})
export class PatientsModule {}
