import { Injectable } from '@angular/core';
import { IUser } from 'src/app/_interfaces/user.interface';
import { writeBatch, doc } from "firebase/firestore";

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

  setUserData(uid: string,email:string,name?:string,business?:string,subdomain?:string,ruc?:number) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${uid}`
    )

    const userData: IUser = {
      uid: uid,
      email: email,
      ...(name && { name: name }),
      ...(business && { business: business }),
      ...(subdomain && { subdomain: subdomain }),
      ...(ruc && { ruc: ruc })
    }
    
    return userRef.set(userData, {
      merge: true,
    })
  }

  async writteUserAndDomainData(uid: string,email:string,name:string,business:string,subdomain:string,ruc:number) {
    try {
      const db = this.afStore.firestore

      const batch = writeBatch(db)

      // Writte user data
      const userRef = doc(db, "users", uid)
      const userData: IUser = {
        uid: uid,
        email: email,
        ...(name && { name: name }),
        ...(business && { business: business }),
        ...(subdomain && { subdomain: subdomain }),
        ...(ruc && { ruc: ruc })
      }
      // register subdomain
      const subdomainRef = doc(db, "subdomains", subdomain)
      const domainData: any = {
        name: subdomain,
        users: [
          { uid: uid }
        ]
      }
      batch.set(userRef, userData, {
        merge: false,
      })
      batch.set(subdomainRef, domainData, {
        merge: true,
      })

      let res = await batch.commit()
      console.error(res)
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }
  }

}
