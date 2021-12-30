import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResult, Paging, Patient } from '@isee/api-interfaces';
import { Observable } from 'rxjs';
import { UrlQueryParams } from '../utils/UrlQueryParams';

@Injectable()
export class PatientsService {
  api_url = 'api/patients';
  constructor(private httpClient: HttpClient) {}

  getList(
    searchValue: string,
    paging: Paging = {
      page: 0,
      take: 10,
    }
  ): Observable<ListResult<Patient>> {
    const params = new UrlQueryParams({
      searchValue,
      ...paging,
    });
    return this.httpClient.get<ListResult<Patient>>(
      `${this.api_url}?${params}`
    );
  }

  get(id: string): Observable<any> {
    return this.httpClient.get(`${this.api_url}/${id}`);
  }

  add(patient: any): Observable<any> {
    return this.httpClient.post(this.api_url, patient);
  }

  modify(id: string, patient: any): Observable<any> {
    return this.httpClient.put(`${this.api_url}/${id}`, patient);
  }
}
