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
  years = [2022];
  month: { text: string; value: number }[] = [
    {
      text: 'იანვარი',
      value: 1,
    },
    {
      text: 'თებერვალი',
      value: 2,
    },
    {
      text: 'მარტი',
      value: 3,
    },
    {
      text: 'აპრილი',
      value: 4,
    },
    {
      text: 'მაისი',
      value: 5,
    },
    {
      text: 'ივნისი',
      value: 6,
    },
    {
      text: 'ივლისი',
      value: 7,
    },
    {
      text: 'აგვისტო',
      value: 8,
    },
    {
      text: 'სექტემბერი',
      value: 9,
    },
    {
      text: 'ოქტომბერი',
      value: 10,
    },
    {
      text: 'ნოემბერი',
      value: 11,
    },
    {
      text: 'დეკემბერი',
      value: 12,
    },
  ];

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

  displayData: { name: string; sum: number; patientCount: number }[] = [];
  salesChartData: any;
  pieChartData: any;
  doctors: Doctor[] = [];

  constructor(
    private service: ReportsService,
    private doctorService: DoctorsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.populateYears();
    combineLatest(
      this.service.getByMonth(this.startDate, this.endDate),
      this.doctorService.getList()
    ).subscribe(([reports, doctors]) => {
      this.doctors = doctors;
      this.populateReport(reports);
    });
  }

  populateYears(): void {
    const currYear = this.currentDate.getFullYear();
    const startYear = this.years[0];
    if (currYear > startYear) {
      for (let i = startYear; i <= currYear; i++) {
        this.years.push(i);
      }
    }
  }

  fetchReport(): void {
    this.service
      .getByMonth(this.startDate, this.endDate)
      .subscribe((reports) => {
        this.populateReport(reports);
      });
  }

  onYearChange(event: any): void {
    const { value } = event;
    this.startDate.setFullYear(value);
    this.endDate.setFullYear(value);
    this.fetchReport();
  }

  onStartMonthChange(event: any): void {
    const { value } = event;
    this.startDate.setMonth(value - 1);
    this.fetchReport();
  }
  onEndMonthChange(event: any): void {
    const { value } = event;
    this.endDate.setMonth(value - 1);
    this.fetchReport();
  }

  populateReport(reports: ReportByMonth[]) {
    this.calculateSums(reports);
    this.calculateSales(reports);
    this.cdr.markForCheck();
  }

  calculateSums(reports: ReportByMonth[]): void {
    const labels: any[] = [];
    const data: any[] = [];
    this.displayData = [];

    this.doctors.forEach((doctor) => {
      let patientCount = 0;
      const sum = reports
        .filter((r) => r.visit_doctorId === doctor.id)
        .reduce((prev, curr) => {
          patientCount += Number(curr.patientCount);
          return prev + Number(curr.sumPrice);
        }, 0);

      this.displayData.push({
        name: doctor.name,
        sum,
        patientCount,
      });
      labels.push(`${doctor.name}`);
      data.push(sum);
    });

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    };
    console.log(this.pieChartData);
  }

  calculateSales(reports: ReportByMonth[]): void {
    const reportArray: any[] = [];
    const labels = [];

    for (let month = this.startMonth; month <= this.endMonth; month++) {
      labels.push(`${month}/${this.selectedYear}`);
    }

    this.doctors.forEach((doctor) => {
      const label = doctor.name;
      const data = [];
      for (let month = this.startMonth; month <= this.endMonth; month++) {
        const selectedReportSum = reports
          .filter((x) => +x.month === month && x.visit_doctorId === doctor.id)
          .reduce((prev, curr) => {
            return prev + Number(curr.sumPrice);
          }, 0);
        data.push(selectedReportSum);
        console.log(selectedReportSum);
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
  }
}
