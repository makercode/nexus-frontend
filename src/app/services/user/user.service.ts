import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { User, Profile } from '../models';
import { AlertHelper } from '../../shared/alert/alert.helper';

@Injectable()
export class UserService {

  constructor(private alertService: AlertService) {
  }

  saveUserInfo(uid, name, email
    // uid, token, image, name, username, bio, email, password
  ) {
    return firebase.database().ref().child('users/' + uid).set({
      name: name,
      email: email
    });
  }

  updateUserInfo(uid, displayName, bio) {
    return firebase.database().ref().child('users/' + uid).update({
      // token: token,
      // image: this.image,
      displayName: displayName,
      bio: bio
      // password: password
    });
  }

  getAdmin() {
    return firebase.database().ref().child('users/' + 'RA21zYtgPHbvG764Ehn3ch8NEHP2').on('value', (snapshot) => {
    });
  }

  getUserProfileInformation() {
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
  }


  verificationUserEmail() {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

  // Password
  /*
  updateUserPassword() {
      let newPassword = getASecureRandomPassword();

      currentUser.updatePassword(getASecureRandomPassword).then(() => {
        // Update successful.
      }, (error) => {
        // An error happened.
      });
  }
  */

  sendUserPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

}
