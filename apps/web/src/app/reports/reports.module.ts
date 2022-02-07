import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { PreviewComponent } from './preview/preview.component';
import { MaterialModule } from '../shared/material.module';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { SalesByDoctorComponent } from './sales-by-doctor/sales-by-doctor.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { ReportsService } from './reports.service';
import { DoctorsService } from '../services/doctors.service';

@NgModule({
  declarations: [
    PreviewComponent,
    SalesOverviewComponent,
    SalesByDoctorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReportsRoutingModule,
    FlexLayoutModule,
    NgChartsModule,
  ],
  providers: [ReportsService, DoctorsService],
})
export class ReportsModule {}
