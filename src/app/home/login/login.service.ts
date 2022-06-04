import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { IUser } from '../models/IUser.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public afAuth: AngularFireAuth) {}

  singUp(payload: IUser): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
  }

  singIn(payload: IUser): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }
}
