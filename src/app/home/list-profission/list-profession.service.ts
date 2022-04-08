import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfession } from '../models/IProfession.model';

@Injectable({
  providedIn: 'root'
})
export class ListProfessionService {

  urlBase = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getProfessions(): Observable<IProfession[]> {
    return this.http.get<IProfession[]>(`${this.urlBase}/profession`);
  }

  deleteProfession(id): Observable<IProfession> {
    return this.http.delete<IProfession>(`${this.urlBase}/profession/${id}`);
  }
}
