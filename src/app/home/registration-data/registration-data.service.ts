import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../models/IData.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  urlBase = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getUser(): Observable<IData> {
    return this.http.get<IData>(`${this.urlBase}/data`);
  }
}
