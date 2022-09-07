import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  level = 'weak'

  constructor(
    public authService: AuthService,
    // private alertService: AlertService
  ) {}

  get username() { return this.registerForm.get('username')!; }
  get password() { return this.registerForm.get('password')!; }

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
 
  alphaNumberOnly (e:any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e:any) {
    e.preventDefault();
    return false;
  }

  ngOnInit() {
  }

  signUp( username: string, userpassword: string ) {
    this.authService.signUp( username, userpassword );
  }

  googleAuth() {
    this.authService.googleAuth();
  }
}
