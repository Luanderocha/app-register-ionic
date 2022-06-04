import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Data } from '../classes/data';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  userRef:AngularFireObject<Data>;

  constructor(private db: AngularFireDatabase) { }

  getData() {
    this.userRef = this.db.object(`/user`);
    return this.userRef;
  }
}
