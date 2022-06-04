import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Profession } from '../classes/profession';

@Injectable({
  providedIn: 'root',
})
export class ListProfessionService {
  professionListRef: AngularFireList<Profession>;
  professionRef: AngularFireObject<Profession>;

  constructor(private db: AngularFireDatabase) {}

  getProfessions() {
    this.professionListRef = this.db.list('/profession');
    return this.professionListRef;
  }

  deleteProfession(id: string) {
    this.professionRef = this.db.object(`/profession/${id}`);
    return this.professionRef.remove();
  }
}
