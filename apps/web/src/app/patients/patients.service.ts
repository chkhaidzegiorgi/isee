import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResult, Paging, Patient } from '@isee/api-interfaces';
import { Observable } from 'rxjs';
import { UrlQueryParams } from '../utils/UrlQueryParams';

@Injectable()
export class PatientsService {
  constructor(private httpClient: HttpClient) {}

  getList(
    searchValue: string,
    paging: Paging
  ): Observable<ListResult<Patient>> {
    const params = new UrlQueryParams({
      searchValue,
      ...paging,
    });
    return this.httpClient.get<ListResult<Patient>>(`api/patients?${params}`);
  }
}
