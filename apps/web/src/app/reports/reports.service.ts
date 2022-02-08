import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportByMonth } from '@isee/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ReportsService {
  api_url = 'api/reports';
  constructor(private httpClient: HttpClient) {}

  getByMonth(start: Date, end: Date): Observable<ReportByMonth[]> {
    return this.httpClient.get<ReportByMonth[]>(
      `${this.api_url}?startDate=${this.formatDate(
        start
      )}&endDate=${this.formatDate(end)}`
    );
  }

  formatDate(date: Date) {
    return date;
  }
}
