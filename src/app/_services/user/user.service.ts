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

  setUserData(uid: string,email:string,name?:string,business?:string,subdomain?:string,ruc?:number,plan?:string) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${uid}`
    );
    const userData: IUser = {
      uid: uid,
      email: email,
      ...(name && { name: name }),
      ...(business && { business: business }),
      ...(subdomain && { subdomain: subdomain }),
      ...(ruc && { ruc: ruc }),
      ...(plan && { plan: plan })
    };
    // console.log(userData)
    return userRef.set(userData, {
      merge: true,
    });
  }

}
