import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResult, Paging, Visit } from '@isee/api-interfaces';
import { Observable } from 'rxjs';
import { UrlQueryParams } from '../utils/UrlQueryParams';

@Injectable()
export class VisitsService {
  api_url = 'api/visits';
  constructor(private httpClient: HttpClient) {}

  getList(searchValue: string, paging: Paging): Observable<ListResult<Visit>> {
    const params = new UrlQueryParams({
      searchValue,
      ...paging,
    });
    return this.httpClient.get<ListResult<Visit>>(`${this.api_url}?${params}`);
  }

  get(id: string): Observable<any> {
    return this.httpClient.get(`${this.api_url}/${id}`);
  }

  add(entity: any): Observable<any> {
    return this.httpClient.post(this.api_url, entity);
  }

  modify(id: string, entity: any): Observable<any> {
    return this.httpClient.put(`${this.api_url}/${id}`, entity);
  }
}
