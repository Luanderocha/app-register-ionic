import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.urlBase}/user`);
  }
}
