import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Doctor, ReportByMonth } from '@isee/api-interfaces';
import { combineLatest } from 'rxjs';
import { DoctorsService } from '../../services/doctors.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'isee-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  years = [2021, 2022, 2023, 2024];
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public get startMonth(): number {
    return this.startDate.getMonth() + 1;
  }

  public get endMonth(): number {
    return this.endDate.getMonth() + 1;
  }

  public get selectedYear(): number {
    return this.endDate.getFullYear();
  }

  currentDate = new Date();
  endDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    0
  );
  startDate = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    1
  );

  salesChartData: any;

  constructor(
    private service: ReportsService,
    private doctorService: DoctorsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    combineLatest(
      this.service.getByMonth(this.startDate, this.endDate),
      this.doctorService.getList()
    ).subscribe(([reports, doctors]) => {
      this.populateReport(reports, doctors);
    });
  }

  populateReport(reports: ReportByMonth[], doctors: Doctor[]) {
    const reportArray: any[] = [];
    const labels = [];

    for (let month = this.startMonth; month <= this.endMonth; month++) {
      labels.push(`${month}/${this.selectedYear}`);
    }

    doctors.forEach((doctor) => {
      const label = doctor.name;
      const data = [];
      for (let month = this.startMonth; month <= this.endMonth; month++) {
        const selectedReport = reports.find(
          (x) => +x.month === month && x.visit_doctorId === doctor.id
        );
        data.push(selectedReport ? +selectedReport.sumPrice : 0);
      }
      reportArray.push({
        label,
        data,
      });
    });
    this.salesChartData = {
      labels,
      datasets: reportArray,
    };
    this.cdr.markForCheck();
  }
}
