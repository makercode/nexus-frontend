import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  level: string = 'weak'
  isValidPassword: boolean = false
  hidePassword: boolean = true

  constructor(
    public authService: AuthService,
    // private alertService: AlertService
  ) {}

  get username() { return this.registerForm.get('username')! }
  get password() { return this.registerForm.get('password')! }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl( '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl( '', [
      Validators.required,
      Validators.minLength(9),
    ]),
    
  });
 
  
  passwordValid(event:any) {
    this.isValidPassword = event
  }

  ngOnInit() {
  }

  signUp( username: string, userpassword: string ) {
    this.authService.signUp( username, userpassword )
  }

  googleAuth() {
    this.authService.googleAuth()
  }
}
