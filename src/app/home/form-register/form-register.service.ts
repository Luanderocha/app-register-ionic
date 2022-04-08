import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfession } from '../models/IProfession.model';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {

  urlBase = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  setProfesssion(payload): Observable<IProfession> {
    return this.http.post<IProfession>(`${this.urlBase}/profession`, payload);
  }

  updateProfession(id, body): Observable<IProfession> {
    return this.http.put<IProfession>(`${this.urlBase}/profession/${id}`, body);
  }

  getProfessionById(id: number): Observable<IProfession> {
    return this.http.get<IProfession>(`${this.urlBase}/profession/${id}`);
  }
}
