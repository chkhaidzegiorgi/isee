import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'isee-sales-by-doctor',
  templateUrl: './sales-by-doctor.component.html',
  styleUrls: ['./sales-by-doctor.component.scss'],
})
export class SalesByDoctorComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() pieChartData: any;
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
}
