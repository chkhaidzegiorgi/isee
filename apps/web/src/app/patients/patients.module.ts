import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../shared/material.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsService } from './patients.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUpdateComponent } from './add-update/add-update.component';
import { AddUpdateFormBuilder } from './add-update/add-update.builder';

@NgModule({
  declarations: [ListComponent, AddUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [PatientsService, AddUpdateFormBuilder],
})
export class PatientsModule {}
