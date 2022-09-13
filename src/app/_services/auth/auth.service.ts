import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, BehaviorSubject  } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  public userObserver: Subject<any> = new BehaviorSubject( {} )

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public userService: UserService,
  ) {
    this.getUserInfo()
  }

  async getUserInfo() {
    this.afAuth.authState.subscribe( (afUser) => {
      console.log('getUserInfo afAuth.authState.subscribe')
      if (afUser) {
        console.log(afUser, afUser!.emailVerified)
        console.log(afUser)
        localStorage.setItem('user', JSON.stringify(afUser));
      } else {
        localStorage.setItem('user', 'null');
      }
      // JSON.parse(localStorage.getItem('user')!);
      this.userObserver.next( afUser );
    })
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['cuenta/salir'])
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if( result.user && result.user.email ){
          this.userService.setUserData(result.user.uid,result.user.email)
        }
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() firebase function */
        this.sendVerificationEmail();
        if( result.user && result.user.email ){
          this.userService.setUserData(result.user.uid,result.user.email)
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationEmail() {
    const userInfo = await this.getUserInfo()
    const isVerified = JSON.parse(localStorage.getItem('user')!).emailVerified;
    console.log(isVerified);
    if (!isVerified) {
      return this.afAuth.currentUser
        .then((user: any) => user.sendEmailVerification())
        .then(() => {
          this.router.navigate(['cuenta/verificame']);
        });
    }
    return false;
  }
  
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);

        if( result.user && result.user.email ){
          this.userService.setUserData(result.user.uid,result.user.email)
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  
}
