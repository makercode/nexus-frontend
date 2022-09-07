import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertHelper } from './../../../../shared/alert/alert.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl( '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl( '', [
      Validators.required,
      Validators.minLength(9)
    ]),
    
  }/*,{ validators: identityRevealedValidator }*/);

  constructor(
    public authService: AuthService,
    // private alertService: AlertService
  ) {}

  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }


  ngOnInit() {
  }

  signIn( username: string, userpassword: string ) {
    this.authService.signIn( username, userpassword );
  }

  googleAuth() {
    this.authService.googleAuth();
  }
  

}
