import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../shared/material.module';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, MaterialModule, PatientsRoutingModule],
})
export class PatientsModule {}
