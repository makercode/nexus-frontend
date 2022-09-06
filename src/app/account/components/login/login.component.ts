import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { NgForm } from '@angular/forms';
import { AlertHelper } from './../../../shared/alert/alert.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  // loading = false;
  public errorMsg = '';
  public isAuth = false;
  public token:any;

  constructor(
    private authService: AuthService,
    // private alertService: AlertService
  ) {}

  ngOnInit() {}

  onSignin(form: NgForm) {
    // this.loading = true
    const email = form.value.email
    const password = form.value.password
    let authResponse = this.authService.signinUser(email, password)
    console.log("auth try")
    console.log(authResponse)
  }

  onLogOut() {
    this.authService.logout();
  }
}
