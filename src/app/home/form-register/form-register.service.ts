import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { Profession } from '../classes/profession';

@Injectable({
  providedIn: 'root',
})
export class FormRegisterService {
  professionListRef: AngularFireList<Profession>;
  professionRef: AngularFireObject<Profession>;

  constructor( private db: AngularFireDatabase) {}

  setProfesssion(payload) {
    this.professionListRef = this.db.list('/profession');
    return this.professionListRef.push(payload);
  }

  updateProfession(id, body) {
    return this.professionRef.update(body);
  }

  getProfessionById(id: string) {
    this.professionRef = this.db.object(`/profession/${id}`);
    return this.professionRef;
  }
}
