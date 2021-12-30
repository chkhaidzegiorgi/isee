import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '@isee/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorsService {
  api_url = 'api/doctors';
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`${this.api_url}`);
  }
}
