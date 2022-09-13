import { Injectable } from '@angular/core';
import { IUser } from 'src/app/_interfaces/user.interface';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable()
export class UserService {

  constructor(
    public afStore: AngularFirestore,
  ) {
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(uid: string,email:string,subdomain?:string,plan?:string) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${uid}`
    );
    const userData: IUser = {
      uid: uid,
      email: email,
      ...(subdomain && { subdomain: subdomain }),
      ...(plan && { plan: plan })
    };
    console.log(userData)
    return userRef.set(userData, {
      merge: true,
    });
  }

}
